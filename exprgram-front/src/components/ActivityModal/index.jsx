import React from 'react';
// import { Modal, Checkbox, Button } from 'semantic-ui-react';

import ActivityFst from './ActivityFst';
import ActivitySnd from './ActivitySnd';
import ActivityTrd from './ActivityTrd';
import ActivityFth from './ActivityFth';
import TestActivityA from './TestActivityA';

function Activities(props) {
    const { type } = props;
    return(
        <div>
        {
            ( type )
            ?
            <div>
                {type === 'a'
                ?
                <TestActivityA open={props._openModal[0]} {...props}/>
                :
                <div>
                <ActivityFst 
                    open={props._openModal[0]}
                    _onClose={props._onCloseModal}
                    rewatch={props.rewatch}
                    userid={props.userid}
                    sentNumber={props.sentNumber}
                    targetExpression={props.targetExpression} />
                <ActivitySnd 
                    open={props._openModal[1]}
                    _onClose={props._onCloseModal}
                    targetExpression={props.targetExpression}
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
                    targetExpression={props.targetExpression} />
                <ActivityFth
                    open={props._openModal[3]}
                    _onClose={props._onCloseModal}
                    rewatch={props.rewatch} 
                    userid={props.userid}
                    sentNumber={props.sentNumber}
                    next={props.next}
                    targetExpression={props.targetExpression}
                    type={type} />
                <TestActivityA open={props._openModal[4]} {...props}/>
                </div>
                }
            </div>
            :
            <div>
                <ActivityFst 
                    open={props._openModal[0]}
                    _onClose={props._onCloseModal}
                    rewatch={props.rewatch}
                    userid={props.userid}
                    sentNumber={props.sentNumber}
                    targetExpression={props.targetExpression} />
                <ActivitySnd 
                    open={props._openModal[1]}
                    _onClose={props._onCloseModal}
                    targetExpression={props.targetExpression}
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
                    targetExpression={props.targetExpression} />
                <ActivityFth
                    open={props._openModal[3]}
                    _onClose={props._onCloseModal}
                    rewatch={props.rewatch} 
                    userid={props.userid}
                    sentNumber={props.sentNumber}
                    next={props.next}
                    targetExpression={props.targetExpression} />
            </div>
        }
        </div>
    )
}

export default Activities;

