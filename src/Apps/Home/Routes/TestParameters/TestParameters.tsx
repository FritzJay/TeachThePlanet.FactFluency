import * as React from 'react'
import { Input, Modal, ModalContent, ModalHeader } from '../../../../Components/Components';

export const TestParameters = () => (
  <div className="test-parameters">
    <Modal className="parameters-modal">
      <ModalHeader className="parameters-header">
        <h1>Test Parameters</h1>
      </ModalHeader>
      <ModalContent className="parameter-content">
        <div className="time-parameter">
          <h3>Duration</h3>
          <div className="minute">
            <label>Minute</label>
            <Input type="text" />
          </div>
          <p>:</p>
          <div className="second">
            <label>Second</label>
            <Input type="text" />
          </div>
        </div>

        <div className="questions-parameters">
          <div className="number-of-questions">
            <label>Number of Questions</label>
            <Input type="text" />
          </div>
          <div className="random-questions">
            <label>Number of Random Questions</label>
            <p>Number of questions from other multiples</p>
            <Input type="text" />
          </div>

          <div className="operators">
            <label>Operators</label>
            <input type="radio">+</input>
            <input type="radio">-</input>
            <input type="radio">÷</input>
            <input type="radio">×</input>
          </div>

          <div className="multiples">
            <label>Multiples Available</label>
            <input type="radio">0</input>
          </div>
        </div>
      </ModalContent>
    </Modal>
  </div>
)