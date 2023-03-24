import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue2，vue3工作中常见用法，以及它们之间的差异",
  description: "aa",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'vue2，vue3工作中常见用法，以及它们之间的差异', link: '/vue2' }
    ],

    sidebar: [
      {
        items: [
          { text: '以vue2为例，讲述vue基本语法', link: '/vue2' },
          { text: 'vue3不同语法格式对比', link: '/vue3' },
          { text: 'vue2，vue3生命周期', link: '/lifecycle' },
          { text: 'Vue3的8种和Vue2的12种组件通信', link: '/vue2vue3Value' },
          { text: 'vue2，vue3对比', link: '/compare' },
          { text: 'vue2，vue3响应式原理', link: '/responsivePrinciple' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
