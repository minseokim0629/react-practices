import React from 'react';
import Modal from "react-modal";
import ReactModal from "react-modal";
import * as styles from './modal.scss';

ReactModal.setAppElement('body');

export default function App() {

    return (
        <>
            {/* example modal01: Minimal */}
            <button>modal01</button>
            <br/><br/>

            <Modal
                isOpen={false}
                contentLabel="modal01 example">
                <h1>modal01</h1>
                <button>
                    Close
                </button>
            </Modal>


            {/* example modal02: Using onRequestClose */}
            <button>modal02</button>
            <br/><br/>

            <Modal
                isOpen={false}
                contentLabel="modal02 example">
                <h1>modal02</h1>
                <button>
                    Close
                </button>
            </Modal>


            {/* example modal03: Using shouldCloseOnOverlayClick */}
            <button>modal03</button>
            <br/><br/>
            <Modal
                isOpen={false}
                contentLabel="modal03 example">
                <h1>modal03</h1>
                <button>
                    Close
                </button>
            </Modal>


            {/* example modal04: Using inline styles */}
            <button>modal04</button>
            <br/><br/>

            <Modal
                isOpen={false}
                contentLabel="modal04 example">
                <h1>modal04</h1>
                <button>
                    Close
                </button>
            </Modal>


            {/* example modal04: Using CSS/SASS styles */}
            <button>modal05</button>
            <br/><br/>

            <Modal
                isOpen={false}
                className={styles.Modal}
                overlayClassName={styles.Overlay}
                style={{content: {width: 350}}}
                contentLabel="modal05 example">
                <h1>비밀번호입력</h1>
                <div>
                    하하하하하하하~
                </div>
                <div className={ styles['modal-dialog-buttons'] }>
                    <button>확인</button>
                    <button>취소</button>
                </div>
            </Modal>
        </>
    );
}