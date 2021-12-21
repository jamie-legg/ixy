import { Popover } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { StreamType } from '@prisma/client';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import { Routes, useMutation, useRouter } from 'blitz';
import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import createStream from '../mutations/createStream';

function NewStreamPopover() {
  const [ streamName, setStreamName ] = useState('');
  const streamTypes = StreamType;
  const [ newStreamType, setNewStreamType ] = useState<StreamType>(streamTypes.PRIVATE);
  const router = useRouter();
  const [createStreamMutation] = useMutation(createStream);
  const currentUser = useCurrentUser();


  const newStream = async () => {
    await createStreamMutation({
    name: streamName,
    owner: { id: currentUser!.id, role: currentUser!.role },
    ownerId: currentUser!.id,
    type: newStreamType
  })
  router.push(
    newStreamType === "PUBLIC" ?
    Routes.GlobalPage() :
    newStreamType === "PRIVATE" ?
    Routes.Me() :
    newStreamType === "AI" ?
    Routes.Yan() :
    Routes.Home());
}
  return (
    <Popover className="relative">
      <Popover.Button className="flex font-bold uppercase">
      <PlusCircleIcon
                    className={"text-black group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    }
                    aria-hidden="true"
                  />
                  create stream</Popover.Button>

      <Popover.Panel className="w-full p-2 absolute z-10">
        <Fade duration={200}>
        <div className="grid font-bold grid-cols-2 p-2 m-2 bg-ixy-800 rounded-lg">
          <div>set type</div>
          <select onChange={
            (e) => {

              setNewStreamType(e.target.value as StreamType)
            }
          } className="block bg-ixy-700 lowercase p-2 rounded-lg w-full">
            {Object.keys(streamTypes).map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <div>& name:</div>
          <div><input value={streamName} onChange={(e) => {
            setStreamName(e.target.value)}
          } className='w-full bg-ixy-700 rounded-lg p-2 placeholder-ixy-100' placeholder='name'></input> </div>
          <div onClick={() => newStream()} className='bg-ixy-500 flex col-span-2 p-2 rounded-lg'>
          <LightningBoltIcon
                    className={"text-black group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                    }
                    aria-hidden="true"
                  />
            Execute</div>
        </div>
        </Fade>
      </Popover.Panel>
    </Popover>
  )
}
export default NewStreamPopover;
