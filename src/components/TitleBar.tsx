import { Cross1Icon } from '@radix-ui/react-icons'
import { appWindow } from '@tauri-apps/api/window'

export default function TitleBar() {
  return (
    <div data-tauri-drag-region className="titlebar bg-gradient-to-r from-teal6 to-teal7 h-full">
      <div onClick={() => appWindow.close()} className="titlebar-button" id="titlebar-close">
        <Cross1Icon className="text-[#3b3247] mr-4" />
      </div>
    </div>
  )
}
