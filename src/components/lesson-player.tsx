"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEditor, Editor, Transforms, Element as SlateElement, Descendant, BaseEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { createClient } from "@/lib/services/auth/client";
import { videoProgressApi } from "@/lib/services/api/video-progress";

type CustomElement = {
  type: "paragraph" | "heading-two" | "heading-three" | "bulleted-list" | "numbered-list" | "list-item" | "block-quote" | "code-block";
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const INITIAL_EDITOR_VALUE: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

interface LearnPageProps {
  course: { id: string; title: string };
  progress: { completedLessons: number; totalLessons: number };
  module: {
    id: string;
    title: string;
    order: number;
    discussionUrl: string | null;
    videos: Array<{
      id: string;
      title: string;
      duration: string | null;
      type: string;
      videoUrl: string | null;
      completed: boolean;
      order: number;
      previousLessonId: string | null;
      nextLessonId: string | null;
    }>;
  };
  courseId: string;
  initialLessonId: string;
}

export default function LearnPage({ course, progress, module, courseId, initialLessonId }: LearnPageProps) {
  const router = useRouter();
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);
  const [activeTab, setActiveTab] = useState("notes");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Video completion tracking
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(
    () => new Set(module.videos.filter((v) => v.completed).map((v) => v.id))
  );
  const [isSaving, setIsSaving] = useState(false);

  // Notes loading & saving
  const [loadedNotes, setLoadedNotes] = useState<Descendant[]>(INITIAL_EDITOR_VALUE);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesSaveStatus, setNotesSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousLessonRef = useRef<string>(currentLessonId);
  const editorValueRef = useRef<Descendant[]>(INITIAL_EDITOR_VALUE);

  // Player.js ref
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Cache user ID to avoid repeated getUser() calls
  const userIdRef = useRef<string | null>(null);

  const getUserId = useCallback(async (): Promise<string | null> => {
    if (userIdRef.current) return userIdRef.current;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) userIdRef.current = user.id;
    return user?.id ?? null;
  }, []);

  // Slate editor — stable instance; key={currentLessonId} on <Slate> handles remounting
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Fetch saved notes when lesson changes
  useEffect(() => {
    let cancelled = false;
    setNotesLoading(true);
    setLoadedNotes(INITIAL_EDITOR_VALUE);

    videoProgressApi.getProgress(currentLessonId).then((data) => {
      if (cancelled) return;
      if (data.notes) {
        try {
          const parsed = JSON.parse(data.notes) as Descendant[];
          setLoadedNotes(parsed);
          editorValueRef.current = parsed;
          // Update editor children so the Slate remount picks up the notes
          editor.children = parsed;
          editor.selection = null;
          editor.history = { undos: [], redos: [] };
        } catch {
          // Invalid JSON, use empty editor
        }
      }
    }).catch(() => {
      // No saved progress, use empty editor
    }).finally(() => {
      if (!cancelled) setNotesLoading(false);
    });

    return () => { cancelled = true; };
  }, [currentLessonId, editor]);

  // Mark video as completed
  const markVideoCompleted = useCallback(async (videoId: string) => {
    if (completedVideos.has(videoId)) return;
    setIsSaving(true);
    try {
      const userId = await getUserId();
      if (!userId) return;
      // Optimistic update
      setCompletedVideos((prev) => new Set(prev).add(videoId));
      await videoProgressApi.saveProgress({
        student_id: userId,
        video_id: videoId,
        is_completed: true,
      });
    } catch (error) {
      console.error("Failed to mark video as completed:", error);
      // Revert optimistic update
      setCompletedVideos((prev) => {
        const next = new Set(prev);
        next.delete(videoId);
        return next;
      });
    } finally {
      setIsSaving(false);
    }
  }, [completedVideos, getUserId]);

  // Player.js ended event listener (dynamic import to avoid SSR window error)
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !currentLessonData?.videoUrl) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (import("player.js") as Promise<any>).then((mod) => {
      if (cancelled) return;
      const PlayerCtor = mod.Player ?? mod.default?.Player;
      const player = new PlayerCtor(iframe);
      player.on("ready", () => {
        if (cancelled) return;
        player.on("ended", () => {
          if (cancelled) return;
          markVideoCompleted(currentLessonId);
        });
      });
    });

    return () => { cancelled = true; };
  }, [currentLessonId, markVideoCompleted]);

  // Save notes for a specific video
  const saveNotes = useCallback(async (videoId: string, notes: Descendant[]) => {
    const userId = await getUserId();
    if (!userId) return;
    // Don't save if notes are empty (just the initial empty paragraph)
    const firstNode = notes[0] as CustomElement;
    const isEmpty = notes.length === 1 &&
      SlateElement.isElement(firstNode) &&
      firstNode.type === "paragraph" &&
      firstNode.children.length === 1 &&
      firstNode.children[0].text === "";
    if (isEmpty) return;

    setNotesSaveStatus("saving");
    try {
      await videoProgressApi.saveProgress({
        student_id: userId,
        video_id: videoId,
        notes: JSON.stringify(notes),
      });
      setNotesSaveStatus("saved");
    } catch (error) {
      console.error("Failed to save notes:", error);
      setNotesSaveStatus("idle");
    }
  }, [getUserId]);

  // Debounced auto-save triggered from onChange
  const handleEditorChange = useCallback((value: Descendant[]) => {
    editorValueRef.current = value;
    setLoadedNotes(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      saveNotes(currentLessonId, value);
    }, 2000);
  }, [currentLessonId, saveNotes]);

  // Save notes for previous lesson when switching lessons
  useEffect(() => {
    if (previousLessonRef.current !== currentLessonId) {
      // Clear any pending debounce
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      // Immediately save notes for the previous lesson
      saveNotes(previousLessonRef.current, editorValueRef.current);
      previousLessonRef.current = currentLessonId;
      editorValueRef.current = INITIAL_EDITOR_VALUE;
      setNotesSaveStatus("idle");
    }
  }, [currentLessonId, saveNotes]);

  const isMarkActive = (format: keyof Omit<CustomText, "text">) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (format: keyof Omit<CustomText, "text">) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isBlockActive = (format: CustomElement["type"]) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  const toggleBlock = (format: CustomElement["type"]) => {
    const isActive = isBlockActive(format);
    const isList = format === "bulleted-list" || format === "numbered-list";

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n.type === "bulleted-list" || n.type === "numbered-list"),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    });

    if (!isActive && isList) {
      Transforms.wrapNodes(editor, { type: format, children: [] });
    }
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    switch (element.type) {
      case "heading-two":
        return <h2 {...attributes} className="text-xl font-bold text-white mb-2">{children}</h2>;
      case "heading-three":
        return <h3 {...attributes} className="text-lg font-semibold text-white mb-1">{children}</h3>;
      case "bulleted-list":
        return <ul {...attributes} className="list-disc ml-5 mb-2">{children}</ul>;
      case "numbered-list":
        return <ol {...attributes} className="list-decimal ml-5 mb-2">{children}</ol>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "block-quote":
        return <blockquote {...attributes} className="border-l-4 border-purple-500 pl-3 italic text-gray-400 mb-2">{children}</blockquote>;
      case "code-block":
        return <pre {...attributes} className="bg-gray-900 rounded p-3 font-mono text-sm mb-2"><code>{children}</code></pre>;
      default:
        return <p {...attributes} className="mb-1">{children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    let el = <>{children}</>;
    if (leaf.bold) el = <strong>{el}</strong>;
    if (leaf.italic) el = <em>{el}</em>;
    if (leaf.underline) el = <u>{el}</u>;
    if (leaf.strikethrough) el = <s>{el}</s>;
    if (leaf.code) el = <code className="bg-gray-900 px-1 rounded text-sm font-mono">{el}</code>;
    return <span {...attributes}>{el}</span>;
  }, []);

  // Find current lesson from module videos
  const currentLessonData = module.videos.find((v) => v.id === currentLessonId) || module.videos[0];

  // Progress using completedVideos set
  const progressPercentage = progress.totalLessons > 0
    ? (completedVideos.size / progress.totalLessons) * 100
    : 0;

  const isCurrentCompleted = completedVideos.has(currentLessonId);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar - Course Navigation */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-gray-800 border-r border-gray-700 flex-shrink-0 transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              {!sidebarCollapsed && <span>Back to course page</span>}
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-xl">{sidebarCollapsed ? '»' : '«'}</span>
            </button>
          </div>

          {!sidebarCollapsed && (
            <div className="mt-4">
              <h2 className="font-bold text-white text-lg mb-2">{course.title}</h2>
            </div>
          )}
        </div>

        {/* Module Videos */}
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          <div className="border-b border-gray-700">
            <div className="p-4">
              <h3 className={`font-semibold mb-3 ${sidebarCollapsed ? 'text-xs' : 'text-sm'} text-gray-200`}>
                {sidebarCollapsed ? `M${module.order}` : module.title}
              </h3>
              <div className="space-y-2">
                {module.videos.map((video) => {
                  const isCompleted = completedVideos.has(video.id);
                  return (
                    <button
                      key={video.id}
                      onClick={() => setCurrentLessonId(video.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${currentLessonId === video.id
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : isCompleted
                            ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm">
                          {isCompleted ? '✓' :
                            video.type === 'video' ? '▶️' :
                              video.type === 'quiz' ? '❓' :
                                video.type === 'lab' ? '🧪' : '📄'}
                        </span>
                        {!sidebarCollapsed && (
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{video.title}</p>
                            {video.duration && (
                              <p className="text-xs opacity-75">{video.duration} min</p>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Progress Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">{currentLessonData?.title}</h1>
            <div className="flex flex-col items-end gap-1">
              <div className="w-40 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400">{completedVideos.size} of {progress.totalLessons} lessons completed</span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="pt-10 flex justify-center">
          <div className="w-1/2 aspect-video">
            {currentLessonData?.videoUrl ? (
              <iframe
                key={currentLessonId}
                ref={iframeRef}
                src={currentLessonData.videoUrl}
                loading="lazy"
                className="w-full h-full border-0"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                <p className="text-gray-400">No video available for this lesson</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-3">
          {currentLessonData?.previousLessonId && (
            <button
              onClick={() => setCurrentLessonId(currentLessonData.previousLessonId!)}
              className="px-5 py-2 border border-gray-500/50 text-gray-300 hover:bg-gray-500/10 text-sm font-medium rounded-lg transition-all"
            >
              Previous Lesson
            </button>
          )}
          <button
            onClick={() => markVideoCompleted(currentLessonId)}
            disabled={isSaving || isCurrentCompleted}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              isCurrentCompleted
                ? 'bg-green-600 text-white cursor-default'
                : isSaving
                  ? 'bg-gray-600 text-gray-300 cursor-wait'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
            }`}
          >
            {isCurrentCompleted ? 'Completed' : isSaving ? 'Saving...' : 'Mark as Completed'}
          </button>
          {currentLessonData?.nextLessonId && (
            <button
              onClick={() => setCurrentLessonId(currentLessonData.nextLessonId!)}
              className="px-5 py-2 border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 text-sm font-medium rounded-lg transition-all"
            >
              Next Lesson
            </button>
          )}
        </div>

        {/* Content Tabs */}
        <div className="flex-1 bg-gray-900 flex flex-col">
          {/* Tab Headers */}
          <div className="border-b border-gray-700">
            <div className="flex">
              {["notes", "discussions"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === tab
                      ? "text-white border-purple-500"
                      : "text-gray-400 border-transparent hover:text-white"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "notes" && (
              <div className="text-gray-300">
                <div className="bg-gray-800 rounded-lg p-4">
                  <Slate
                    key={`${currentLessonId}-${notesLoading}`}
                    editor={editor}
                    initialValue={loadedNotes}
                    onChange={handleEditorChange}
                  >
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 pb-3 mb-3 border-b border-gray-600">
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleMark("bold"); }}
                        className={`px-2 py-1 rounded text-sm font-bold transition-colors ${isMarkActive("bold") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        B
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleMark("italic"); }}
                        className={`px-2 py-1 rounded text-sm italic transition-colors ${isMarkActive("italic") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        I
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleMark("underline"); }}
                        className={`px-2 py-1 rounded text-sm underline transition-colors ${isMarkActive("underline") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        U
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleMark("strikethrough"); }}
                        className={`px-2 py-1 rounded text-sm line-through transition-colors ${isMarkActive("strikethrough") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        S
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleMark("code"); }}
                        className={`px-2 py-1 rounded text-sm font-mono transition-colors ${isMarkActive("code") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        Code
                      </button>
                      <div className="w-px h-5 bg-gray-600 mx-1" />
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("heading-two"); }}
                        className={`px-2 py-1 rounded text-sm transition-colors ${isBlockActive("heading-two") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        H2
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("heading-three"); }}
                        className={`px-2 py-1 rounded text-sm transition-colors ${isBlockActive("heading-three") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        H3
                      </button>
                      <div className="w-px h-5 bg-gray-600 mx-1" />
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("bulleted-list"); }}
                        className={`px-2 py-1 rounded text-sm transition-colors ${isBlockActive("bulleted-list") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        Bullet
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("numbered-list"); }}
                        className={`px-2 py-1 rounded text-sm transition-colors ${isBlockActive("numbered-list") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        Numbered
                      </button>
                      <div className="w-px h-5 bg-gray-600 mx-1" />
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("block-quote"); }}
                        className={`px-2 py-1 rounded text-sm transition-colors ${isBlockActive("block-quote") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        Quote
                      </button>
                      <button
                        onMouseDown={(e) => { e.preventDefault(); toggleBlock("code-block"); }}
                        className={`px-2 py-1 rounded text-sm font-mono transition-colors ${isBlockActive("code-block") ? "bg-purple-500/30 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
                      >
                        {"</>"}
                      </button>
                    </div>
                    {/* Editor */}
                    <div className="bg-gray-700 rounded-lg overflow-y-auto max-h-[300px] p-3 min-h-[150px] text-gray-200">
                      <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Start writing your notes here..."
                        spellCheck
                      />
                    </div>
                    {/* Save Bar */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      {notesSaveStatus !== "idle" && (
                        <p className={`text-xs ${notesSaveStatus === "saving" ? "text-yellow-400" : "text-green-400"}`}>
                          {notesSaveStatus === "saving" ? "Saving..." : "Saved"}
                        </p>
                      )}
                      <button
                        onClick={() => {
                          if (debounceTimerRef.current) {
                            clearTimeout(debounceTimerRef.current);
                            debounceTimerRef.current = null;
                          }
                          saveNotes(currentLessonId, editorValueRef.current);
                        }}
                        disabled={notesSaveStatus === "saving"}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          notesSaveStatus === "saving"
                            ? "bg-gray-600 text-gray-400 cursor-wait"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                        }`}
                      >
                        Save Notes
                      </button>
                    </div>
                  </Slate>
                </div>
              </div>
            )}

            {activeTab === "discussions" && (
              <div className="text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  {module.discussionUrl ? (
                    <>
                      <h4 className="font-semibold text-white mb-2">Join the Discussion</h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Ask questions, share insights, and connect with other learners in our community forum.
                      </p>
                      <a
                        href={module.discussionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium rounded-lg transition-all"
                      >
                        Go to Discussions
                      </a>
                    </>
                  ) : (
                    <>
                      <h4 className="font-semibold text-white mb-2">Discussions</h4>
                      <p className="text-gray-400 text-sm">
                        Discussions are not available for this module yet.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
