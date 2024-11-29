<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useLeafer } from '@/hooks/useLeafer';

  const { createRobot, setGround } = useLeafer();

  onMounted(() => {
    setGround();
    createRobot({
      url: '/src/assets/tank_profile.png', size: { width: 48, height: 48 }, total: 8,
      actions: {  // 预设游戏动作（通过动作帧）
        up: 0, // 静止向上的箭头（ 编号为0的动作帧）
        right: 6,
        down: 2,
        left: 4,
      },
      action: 'right'
    });
  })
</script>

<template>

</template>

<style scoped>
/* @import '@/assets/main.css'; */
</style>
