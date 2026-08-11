import type { Preview } from "@storybook/nextjs-vite";
// QuizPocket のブランドカラー（.bg-base 等）はハンドコーディングされたプレーン CSS
// クラスのため、globals.css を import しないと未スタイルで表示される。
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile320: {
          name: "Mobile 320px",
          styles: { width: "320px", height: "568px" },
        },
        mobile375: {
          name: "Mobile 375px",
          styles: { width: "375px", height: "812px" },
        },
        mobile414: {
          name: "Mobile 414px",
          styles: { width: "414px", height: "896px" },
        },
      },
    },
  },
  initialGlobals: {
    viewport: { value: "mobile375", isRotated: false },
  },
};

export default preview;
