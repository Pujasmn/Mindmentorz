// import React, { useState, useEffect } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Avatar,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Checkbox,
//   FormControlLabel,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl
// } from '@mui/material';
// import SchoolIcon from '@mui/icons-material/School';
// import AttendanceTracker from './AttendanceTracker';

// const StudentCoachingPlatform = () => {
//   const [roomId, setRoomId] = useState('');
//   const [username, setUsername] = useState('');
//   const [isCallStarted, setIsCallStarted] = useState(false);
//   const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  
//   // Meeting configuration options
//   const [meetingConfig, setMeetingConfig] = useState({
//     allowRecording: false,
//     enableScreenSharing: false,
//     enableWhiteboard: false,
//     sessionType: 'group',
//     maxParticipants: 10
//   });

//   // Attendance tracking
//   const [attendanceEnabled, setAttendanceEnabled] = useState(false);
//   const [attendanceList, setAttendanceList] = useState([]);

//   const startCall = async () => {
//     if (!roomId || !username) {
//       alert('Please enter both Room ID and Username');
//       return;
//     }

//     const appID = 1296094150; // Replace with your Zegocloud App ID
//     const serverSecret = '6ae0f42854031d2682da5d8286fac927'; // Replace with your server secret

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID, 
//       serverSecret, 
//       roomId, 
//       Date.now().toString(), 
//       username
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
    
//     // Configure meeting based on selected options
//     const meetingScenario = meetingConfig.sessionType === 'group'
//       ? ZegoUIKitPrebuilt.GroupCall
//       : ZegoUIKitPrebuilt.OneONoneCall;

//     zp.joinRoom({
//       container: document.getElementById('video-container'),
//       sharedLinks: [
//         {
//           name: 'Meeting link',
//           url: window.location.origin + `/meeting/${roomId}`
//         }
//       ],
//       scenario: {
//         mode: meetingScenario,
//         config: {
//           maxUsers: meetingConfig.maxParticipants
//         }
//       },
//       // Enable recording if selected
//       recordingConfig: meetingConfig.allowRecording 
//         ? { cloudRecording: true } 
//         : undefined,
      
//       // Additional feature flags
//       showScreenSharingButton: meetingConfig.enableScreenSharing,
//       showWhiteboardButton: meetingConfig.enableWhiteboard,
      
//       onUserJoin: (userInfo) => {
//         // Track attendance when users join
//         if (attendanceEnabled) {
//           const newAttendee = {
//             id: userInfo.userId,
//             name: userInfo.userName,
//             joinTime: new Date().toLocaleString()
//           };
//           setAttendanceList(prev => [...prev, newAttendee]);
//         }
//       },
      
//       onLeaveRoom: () => {
//         setIsCallStarted(false);
//       }
//     });

//     setIsCallStarted(true);
//   };

//   const handleOpenSettings = () => {
//     setOpenSettingsDialog(true);
//   };

//   const handleCloseSettings = () => {
//     setOpenSettingsDialog(false);
//   };

//   const handleConfigChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setMeetingConfig(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           padding: 4, 
//           marginTop: 4, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center' 
//         }}
//       >
//         {!isCallStarted ? (
//           <Box 
//             sx={{ 
//               display: 'flex', 
//               flexDirection: 'column', 
//               alignItems: 'center', 
//               width: '100%' 
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//               <SchoolIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Student Coaching Platform
//             </Typography>
//             <Box sx={{ mt: 3, width: '100%' }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Room ID"
//                 value={roomId}
//                 onChange={(e) => setRoomId(e.target.value)}
//                 placeholder="Enter Room ID"
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 label="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter Your Name"
//               />
              
//               {/* Meeting Configuration Button */}
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 fullWidth
//                 sx={{ mt: 2, mb: 2 }}
//                 onClick={handleOpenSettings}
//               >
//                 Meeting Configuration
//               </Button>

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 2, mb: 2 }}
//                 onClick={startCall}
//               >
//                 Start Video Call
//               </Button>
//             </Box>
//           </Box>
//         ) : null}
        
//         <div 
//           id="video-container" 
//           style={{ 
//             width: '100%', 
//             height: isCallStarted ? '500px' : '0px', 
//             transition: 'height 0.3s ease' 
//           }} 
//         />

//         {/* Attendance Tracking */}
//         {isCallStarted && attendanceEnabled && (
//           <AttendanceTracker attendanceList={attendanceList} />
//         )}
//       </Paper>

//       {/* Meeting Configuration Dialog */}
//       <Dialog open={openSettingsDialog} onClose={handleCloseSettings}>
//         <DialogTitle>Meeting Configuration</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Session Type</InputLabel>
//                 <Select
//                   name="sessionType"
//                   value={meetingConfig.sessionType}
//                   label="Session Type"
//                   onChange={handleConfigChange}
//                 >
//                   <MenuItem value="group">Group Call</MenuItem>
//                   <MenuItem value="oneOnOne">One-on-One Call</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Max Participants"
//                 name="maxParticipants"
//                 value={meetingConfig.maxParticipants}
//                 onChange={handleConfigChange}
//                 inputProps={{ min: 2, max: 50 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="allowRecording"
//                     checked={meetingConfig.allowRecording}
//                     onChange={handleConfigChange}
//                   />
//                 }
//                 label="Allow Recording"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="enableScreenSharing"
//                     checked={meetingConfig.enableScreenSharing}
//                     onChange={handleConfigChange}
//                   />
//                 }
//                 label="Enable Screen Sharing"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name="enableWhiteboard"
//                     checked={meetingConfig.enableWhiteboard}
//                     onChange={handleConfigChange}
//                   />
//                 }
//                 label="Enable Whiteboard"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={attendanceEnabled}
//                     onChange={(e) => setAttendanceEnabled(e.target.checked)}
//                   />
//                 }
//                 label="Enable Attendance Tracking"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSettings}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// // Attendance Tracker Component
// const AttendanceTracker = ({ attendanceList }) => {
//   return (
//     <Paper elevation={2} sx={{ mt: 3, p: 2, width: '100%' }}>
//       <Typography variant="h6">Attendance</Typography>
//       {attendanceList.map((attendee, index) => (
//         <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//           <Typography>{attendee.name}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {attendee.joinTime}
//           </Typography>
//         </Box>
//       ))}
//     </Paper>
//   );
// };

// export default StudentCoachingPlatform;







import React, { useState, useEffect } from 'react';
import SendbirdCall from 'sendbird-calls';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const StudentCoachingPlatform = () => {
  const [appId, setAppId] = useState('');
  const [username, setUsername] = useState('');
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [callInstance, setCallInstance] = useState(null);
  
  // Meeting configuration options
  const [meetingConfig, setMeetingConfig] = useState({
    allowRecording: false,
    enableScreenSharing: false,
    sessionType: 'group',
    maxParticipants: 10
  });

  // Attendance tracking
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    // Initialize Sendbird Call
    const initializeSendbirdCall = () => {
      SendbirdCall.init(appId);
      SendbirdCall.setLogLevel(SendbirdCall.LogLevel.INFO);
    };

    if (appId) {
      initializeSendbirdCall();
    }

    // Cleanup
    return () => {
      if (callInstance) {
        callInstance.end();
      }
    };
  }, [appId]);

  const startCall = async () => {
    if (!appId || !username) {
      alert('Please enter App ID and Username');
      return;
    }

    try {
      // Authenticate user
      const authParams = { userId: username };
      await SendbirdCall.authenticate(authParams);

      // Connect to Sendbird
      await SendbirdCall.connect();

      // Create a room
      const roomParams = {
        roomType: meetingConfig.sessionType === 'group' 
          ? SendbirdCall.RoomType.GROUP 
          : SendbirdCall.RoomType.SMALL_ROOM_FOR_AUDIO_CHAT,
        maxParticipantCount: meetingConfig.maxParticipants
      };

      const room = await SendbirdCall.createRoom(roomParams);

      // Enter the room
      await room.enter();

      // Set up local video stream
      const localParticipant = await SendbirdCall.createLocalParticipant();
      const localVideoTrack = await SendbirdCall.createLocalVideoTrack();
      localParticipant.addVideoTrack(localVideoTrack);

      // Track participants
      room.addEventListener('participantEntered', (participant) => {
        setAttendanceList(prev => [
          ...prev, 
          { 
            id: participant.participantId, 
            name: participant.user.nickname, 
            joinTime: new Date().toLocaleString() 
          }
        ]);
      });

      setCallInstance(room);
      setIsCallStarted(true);
    } catch (error) {
      console.error('Call initialization error:', error);
      alert('Failed to start call. Please check your credentials.');
    }
  };

  const endCall = () => {
    if (callInstance) {
      callInstance.exit();
      setIsCallStarted(false);
      setCallInstance(null);
    }
  };

  const handleOpenSettings = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettings = () => {
    setOpenSettingsDialog(false);
  };

  const handleConfigChange = (event) => {
    const { name, value, type, checked } = event.target;
    setMeetingConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          marginTop: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        {!isCallStarted ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              width: '100%' 
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Student Coaching Platform
            </Typography>
            <Box sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Sendbird App ID"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Enter Sendbird App ID"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Name"
              />
              
              {/* Meeting Configuration Button */}
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                onClick={handleOpenSettings}
              >
                Meeting Configuration
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                onClick={startCall}
              >
                Start Video Call
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">Call Active</Typography>
            <Button 
              variant="contained" 
              color="error" 
              onClick={endCall}
              sx={{ mt: 2 }}
            >
              End Call
            </Button>
          </Box>
        )}
        
        {/* Attendance Tracking */}
        {isCallStarted && (
          <Paper elevation={2} sx={{ mt: 3, p: 2, width: '100%' }}>
            <Typography variant="h6">Attendance</Typography>
            {attendanceList.map((attendee, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 1 
                }}
              >
                <Typography>{attendee.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {attendee.joinTime}
                </Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Paper>

      {/* Meeting Configuration Dialog */}
      <Dialog open={openSettingsDialog} onClose={handleCloseSettings}>
        <DialogTitle>Meeting Configuration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Session Type</InputLabel>
                <Select
                  name="sessionType"
                  value={meetingConfig.sessionType}
                  label="Session Type"
                  onChange={handleConfigChange}
                >
                  <MenuItem value="group">Group Call</MenuItem>
                  <MenuItem value="oneOnOne">One-on-One Call</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Max Participants"
                name="maxParticipants"
                value={meetingConfig.maxParticipants}
                onChange={handleConfigChange}
                inputProps={{ min: 2, max: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="allowRecording"
                    checked={meetingConfig.allowRecording}
                    onChange={handleConfigChange}
                  />
                }
                label="Allow Recording"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="enableScreenSharing"
                    checked={meetingConfig.enableScreenSharing}
                    onChange={handleConfigChange}
                  />
                }
                label="Enable Screen Sharing"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSettings}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentCoachingPlatform;