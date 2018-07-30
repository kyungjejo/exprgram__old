import React from 'react';
// import { Modal, Checkbox, Button } from 'semantic-ui-react';

import ActivityFst from './ActivityFst';
import ActivitySnd from './ActivitySnd';
import ActivityTrd from './ActivityTrd';
import ActivityFth from './ActivityFth';

function Activities(props) {
    return(
        <div>
            <ActivityFst 
                open={props._openModal[0]}
                _onClose={props._onCloseModal}
                rewatch={props.rewatch}
                userid={props.userid}
                sentNumber={props.sentNumber}
                targetExpression={props.taregtExpression} />
            <ActivitySnd 
                open={props._openModal[1]}
                _onClose={props._onCloseModal}
                targetExpression={props.taregtExpression}
                rewatch={props.rewatch} 
                userid={props.userid}
                sentNumber={props.sentNumber} />
            <ActivityTrd 
                open={props._openModal[2]}
                _onClose={props._onCloseModal}
                rewatch={props.rewatch} 
                userid={props.userid}
                sentNumber={props.sentNumber}
                next={props.next}
                targetExpression={props.taregtExpression} />
            <ActivityFth
                open={props._openModal[3]}
                _onClose={props._onCloseModal}
                rewatch={props.rewatch} 
                userid={props.userid}
                sentNumber={props.sentNumber}
                next={props.next}
                targetExpression={props.taregtExpression} />
        </div>
    )
}

export default Activities;

