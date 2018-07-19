import React from 'react';
// import { Modal, Checkbox, Button } from 'semantic-ui-react';

import ActivityFst from './ActivityFst';
import ActivitySnd from './ActivitySnd';
import ActivityTrd from './ActivityTrd';

function Activities(props) {
    return(
        <div>
            <ActivityFst 
                open={props._openModal[0]}
                _onClose={props._onCloseModal}
                rewatch={props.rewatch}
                userid={props.userid}
                sentNumber={props.sentNumber} />
            <ActivitySnd 
                open={props._openModal[1]}
                _onClose={props._onCloseModal}
                taregtExpression={props.taregtExpression}
                rewatch={props.rewatch} 
                userid={props.userid}
                sentNumber={props.sentNumber} />
            <ActivityTrd 
                open={props._openModal[2]}
                _onClose={props._onCloseModal}
                rewatch={props.rewatch} 
                userid={props.userid}
                sentNumber={props.sentNumber}
                next={props.next} />
        </div>
    )
}

export default Activities;

