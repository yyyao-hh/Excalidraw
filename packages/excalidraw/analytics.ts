// 用于在应用中跟踪用户行为事件

// place here categories that you want to track. We want to track just a
// small subset of categories at a given time.
const ALLOWED_CATEGORIES_TO_TRACK = ["ai", "command_palette"] as string[]; // 允许跟踪的事件类别

export const trackEvent = (
  category: string, // 事件类别, 用于分类事件
  action: string,   // 事件动作, 描述用户的具体行为
  label?: string,   // 事件标签, 提供额外的信息
  value?: number,   // 事件值, 可以用于数值数据的跟踪
) => {
  try {
    // prettier-ignore
    if (
      typeof window === "undefined"
      || import.meta.env.VITE_WORKER_ID
      // comment out to debug locally
      || import.meta.env.PROD
    ) {
      return;
    }

    if (!ALLOWED_CATEGORIES_TO_TRACK.includes(category)) {
      return;
    }

    if (!import.meta.env.PROD) {
      console.info("trackEvent", { category, action, label, value });
    }

    if (window.sa_event) {
      window.sa_event(action, {
        category,
        label,
        value,
      });
    }
  } catch (error) {
    console.error("error during analytics", error);
  }
};
