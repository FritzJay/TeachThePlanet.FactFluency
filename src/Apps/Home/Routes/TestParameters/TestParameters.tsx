import * as React from 'react'
import { Input, Modal, ModalContent, ModalHeader } from '../../../../Components/Components';
import './TestParameters.css';

export const TestParameters = () => (
    <Modal className="test-parameters-modal">
      <ModalHeader className="parameters-header">
        <h1>Test Parameters</h1>
      </ModalHeader>
      <ModalContent className="parameter-content">
        <div className="time-parameter">
          <h3 className="duration-subheader">Duration</h3>
          <div className="time-input">
            <div className="minute">
              <Input type="text" placeholder="Minute" />
            </div>
            <p>:</p>
            <div className="second">
              <Input type="text" placeholder="Second"/>
            </div>
          </div>
        </div>

        <div className="questions-parameters">
          <div className="number-of-questions">
            <h3>Number of Questions</h3>
            <Input type="text" />
          </div>
          <div className="random-questions">
            <h3>Number of Random Questions</h3>
            <p>Number of questions from other multiples</p>
            <Input type="text" />
          </div>
        </div>

        <div className="number-parameters">
          <div className="operators">
            <h3>Operators</h3>
            <button type="submit" className="select-operator active">+</button>
          </div>

          <div className="multiples">
            <h3>Multiples Available</h3>
            <button type="submit" className="select-multiples active">0</button>
          </div>
        </div>
      </ModalContent>
    </Modal>
)
