import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// Stateless functional component where we don't need  the return {} since we're just returning one thing.
// e.g the following is the same....as the implicit return below:
// const OptionModel = () => {
//     return (
//         <div>
//             <p>Some Text</p>
//         </div>
//     )
// }

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Selected Option"
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Selected Option</h3>
        { props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button
            className="button"
            onClick={props.handleClearSelectedOption}
            >
            Okay
        </button>
    </Modal>
);

export default OptionModal;

// The Modal component requires 2 props, the isOpen and the contentlabel, the later is required for accessiblity.
// The label can be anything you want.

// The props.selectedOption will either be undefined or text - this can be converted to a
// bool by using the double ! -> "!!" - this is called a "true boolean".
