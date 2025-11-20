import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  receiver: null,
  chatRoomId: null, 
  unreadMessage: 0, 
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state, action) => {
      const {receiver, chatRoomId, unreadMessage} = action.payload;
      state.receiver = receiver;
      state.chatRoomId = chatRoomId;
      // state.chatRoomId = '6916bb63e3037d8e0f3550d5';
      state.unreadMessage = unreadMessage;

    //   console.log("from slice", receiver)
    },
    
  },
});

// Export actions
export const { setChatData } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
