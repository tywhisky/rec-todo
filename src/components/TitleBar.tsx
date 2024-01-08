import { Cross1Icon } from '@radix-ui/react-icons'
import { appWindow } from '@tauri-apps/api/window'

export default function TitleBar() {
  return (
    <div data-tauri-drag-region className="titlebar bg-gradient-to-r from-[#d2aac2] to-[#a76cae] h-full">
      <div onClick={() => appWindow.close()} className="titlebar-button" id="titlebar-close">
        <Cross1Icon className="text-[#3b3247] mr-4" />
      </div>
    </div>
  )
}
