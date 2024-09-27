"use client";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = 'mmhfdzb5evj2';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1pheW5lX0NhcnJpY2siLCJ1c2VyX2lkIjoiWmF5bmVfQ2FycmljayIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzI3MzczMDAyLCJleHAiOjE3Mjc5Nzc4MDJ9.m1HXZaTxP6ILzXU1rvjHu22D96PfiTmqLorbfK4lpjQ';
const userId = 'Zayne_Carrick';
const callId = 'r8HK4EAlqPV7';

const user = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function Page() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  // Handle call disconnected state
  if (callingState === CallingState.ENDED) {
    
    return <div>Call disconnected</div>;
  }

  // Handle loading state while joining the call
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      {/* CallControls with customized controls */}
      <CallControls onHangUp={() => call.leave()} />
    </StreamTheme>
  );
};
