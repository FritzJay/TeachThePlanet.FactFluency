import * as React from 'react'
import { Input, Modal, ModalContent, ModalHeader } from 'src/Components/Components'
import './TestParameters.css'

export class TestParameters extends React.Component<any> {
  public render() {
    return (
      <Modal
        overlay={true}
        className="test-parameters-modal"
      >

        <ModalHeader className="parameters-header">
          <h1>Test Parameters</h1>
        </ModalHeader>

        <ModalContent className="parameter-content">

          <div className="time-parameter">
            <h3 className="duration-subheader">Duration</h3>

            <div className="time-input">
              <div className="minute">
                <Input type="number" placeholder="Minute" />
              </div>

              <p>:</p>

              <div className="second">
                <Input type="number" placeholder="Second"/>
              </div>
            </div>
          </div>

          <div className="questions-parameters">
            <div className="number-of-questions">
              <h3>Number of Questions</h3>

              <Input type="number" value={20} />
            </div>

            <div className="random-questions">
              <h3>Number of Random Questions</h3>

              <p>Number of questions from other multiples</p>

              <Input type="number" value={0} />
            </div>
          </div>

          <div className="number-parameters">
            <div className="operators">
              <h3>Operators</h3>
              <button className="select-operator active">+</button>
            </div>

            <div className="multiples">
              <h3>Multiples Available</h3>
              <button className="select-multiples active">0</button>
            </div>
          </div>

        </ModalContent>
      </Modal>
    )
  }
}