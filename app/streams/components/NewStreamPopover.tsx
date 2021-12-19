import { Popover } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/outline';
import { Fade } from 'react-awesome-reveal';

function NewStreamPopover() {
  return (
    <Popover className="relative">
      <Popover.Button className="flex">
      <PlusCircleIcon
                    className={"text-black group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    }
                    aria-hidden="true"
                  />
                  create new</Popover.Button>

      <Popover.Panel className="absolute z-10">
        <Fade duration={200}>
        <div className="grid grid-cols-2">
          <div>Type</div>
          <select className="block w-full">
            <option>Private</option>
            <option>AI</option>
            <option>Public</option>
          </select>
          <div>Name</div>
          <div>Security</div>
          <div>Integrations</div>
        </div>
        </Fade>
      </Popover.Panel>
    </Popover>
  )
}
export default NewStreamPopover;
