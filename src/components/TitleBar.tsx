import { appWindow } from '@tauri-apps/api/window'

export default function TitleBar() {
  return (
    <div data-tauri-drag-region className="titlebar bg-violet-400 border-violet-400">
      <div onClick={() => appWindow.minimize()} className="titlebar-button" id="titlebar-minimize">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
      </div>
      <div onClick={() => appWindow.maximize()} className="titlebar-button" id="titlebar-maximize">
        <div className="w-3 h-3 rounded-full bg-[#28c940]"></div>
      </div>
      <div onClick={() => appWindow.close()} className="titlebar-button" id="titlebar-close">
        <div className="w-3 h-3 rounded-full bg-[#ff5f58]"></div>
      </div>
    </div>
  )
}
