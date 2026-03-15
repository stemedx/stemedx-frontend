declare module "player.js" {
  interface PlayerInstance {
    on(event: "ready", callback: () => void): void;
    on(event: "ended", callback: () => void): void;
    on(event: string, callback: (...args: unknown[]) => void): void;
    off(event: string, callback?: (...args: unknown[]) => void): void;
  }

  interface PlayerConstructor {
    new (element: HTMLIFrameElement, options?: Record<string, unknown>): PlayerInstance;
  }

  interface PlayerJS {
    Player: PlayerConstructor;
  }

  const playerjs: PlayerJS;
  export = playerjs;
}
