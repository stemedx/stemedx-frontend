import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { ReachUsClient } from "@/components/reachus-client";

export default function ReachUs() {
  const CONTENT = getTranslations("reachus", CURRENT_LANGUAGE) as {
    header: {
      title: string;
      subtitle: string;
    };
    contactInfo: {
      methods: Array<{
        id: string;
        icon: string;
        title: string;
        content: string;
        action: string | null;
        enabled: boolean;
      }>;
    };
  };

  return <ReachUsClient content={CONTENT} />;
}
