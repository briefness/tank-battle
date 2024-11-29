import { onBeforeUnmount } from 'vue';
import { App, Leafer, Robot, KeyEvent, Rect } from 'leafer-game';
import type { OptionProps, ActionKey } from '@/type/robot';

// 坦克移动速度
const SPEED = 5;

let app: App | null = null;
if (!app) {
  app = new App({ view: window });
  app.ground = new Leafer();
  app.sky = new Leafer({ type: 'draw' });
  app.add(app.ground);
  app.add(app.sky);
  onKeyboardEvent();
}

// 添加键盘事件
function onKeyboardEvent() {
  if (!app) {
    throw new Error('app is not initialized');
  }
  app?.sky.on(KeyEvent.DOWN, (e: KeyEvent) => {
    // 获取己方坦克数据
    const ownTank = app?.sky.findOne('#ownTank') as Robot;
    if (!ownTank) {
      return;
    }
    switch (e.code) { // 动态的方向箭头
      case 'ArrowUp':
          ownTank.action = 'up'
          ownTank.y -= SPEED
          break
      case 'ArrowDown':
          ownTank.action = 'down'
          ownTank.y += SPEED
          break
      case 'ArrowLeft':
          ownTank.action = 'left'
          ownTank.x -= SPEED
          break
      case 'ArrowRight':
          ownTank.action = 'right'
          ownTank.x += SPEED
          break
    }
  })
}

// 设置背景
function setGround() {
  if (!app) {
    throw new Error('app is not initialized');
  }
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const background = new Rect({
    width: windowWidth,
    height: windowHeight,
    fill: 'rgb(0,0,0)'
  });
  app?.ground.add(background);
}
// 创建精灵
function createRobot(option: OptionProps) {
  if (!app) {
    throw new Error('app is not initialized');
  }
  // 创建一个精灵
  const robot: Robot = new Robot({
    id: 'ownTank',
    x: option.x,
    y: option.y,
    robot: { url: option.url, size: option.size, total: option.total },
    actions: option.actions,
    action: option.action // 设置动作：静止向右的箭头
  });

  app?.sky.add(robot);
  // 移动方向设置
  function setMoveDirection(key: ActionKey) {
    robot.action = key;
  }
  return {
    setMoveDirection,
    robot,
  };
}

export function useLeafer() {
  if (!app) {
    throw new Error('app is not initialized');
  }
  onBeforeUnmount(() => {
    app?.destroy();
  })

  return {
    app,
    ground: app.ground,
    leafer: app.sky,
    setGround,
    createRobot,
  };
}

