import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchState } from '../middlewares/Chat';
import * as selectors from '../selectors';
import Messages from '../components/Messages';
import UserName from '../components/User/UserName';
import ChatInput from '../components/ChatInput';
import GameStatusCodes from '../config/gameStatusCodes';
import GameTypeCodes from '../config/gameTypeCodes';
import 'emoji-mart/css/emoji-mart.css';
import Notifications from './Notifications';

const ChatWidget = () => {
  const users = useSelector(state => selectors.chatUsersSelector(state));
  const messages = useSelector(state => selectors.chatMessagesSelector(state));
  const isStoredGame = useSelector(
    state => selectors.gameStatusSelector(state).status === GameStatusCodes.stored,
  );
  const gameType = useSelector(selectors.gameTypeSelector);
  const dispatch = useDispatch();
  const isTournamentGame = (gameType === GameTypeCodes.tournament);

  useEffect(() => {
    if (!isStoredGame) {
      dispatch(fetchState());
    }
  }, [dispatch, isStoredGame]);

  const uniqUsers = _.uniqBy(users, 'id');
  const listOfUsers = isTournamentGame ? _.filter(uniqUsers, { isBot: false }) : uniqUsers;
  return (
    <div className="d-flex shadow-sm h-100">
      <div className="col-12 col-sm-8 p-0 bg-white rounded-left h-100 position-relative">
        <Messages messages={messages} />
        {!isStoredGame && <ChatInput />}
      </div>
      <div className="col-4 d-none d-sm-block p-0 border-left bg-white rounded-right">
        <div className="d-flex flex-column justify-content-start overflow-auto h-100">
          <div className="px-3 py-3 w-100">
            <Notifications />
          </div>
          <div className="px-3 py-3 w-100 border-top">
            <p className="mb-1">{`Online users: ${listOfUsers.length}`}</p>
            {listOfUsers.map(user => (
              <div key={user.id} className="my-1">
                <UserName user={user} />
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
