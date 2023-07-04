import { useEffect, useState } from "react"
import Modal from "react-modal"
import './HomePage.css'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

return (
<>
    <div className={`homepage ${isLoaded ? "fade-in" : ""}`}>
        <h1>Welcome</h1>
        <h4>BalzanoBeats is a one-stop-shop for all of your music production needs</h4>
        <button onClick={openModal} className="modal-button">Learn More</button>
    </div>

    <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Learn More Modal"
        className="custom-modal"
        overlayClassName="modal-overlay"
    >
    <h2 className="modal-text">Using the site</h2>
    <br />
    <br />
    <h5 className="modal-text">Navigate to the 'Beats' tab to view all beats in the store</h5>
    <br />
    <h5 className="modal-text">Click on the 'Details' button for a beat to view details and listen to the beat</h5>
    <br />
    <h5 className="modal-text">Click the 'Login' button in the top right of the page to create an account and login</h5>
    <br />
    <h5 className="modal-text">After logging in, you can purchase a beat by clicking the 'Add to Cart' button on the details page for a beat</h5>
    <br />
    <h5 className="modal-text">In your cart, you can change the amount of licenses you want to purchase</h5>
    <br />
    <h5 className="modal-text">Once you have an account, you can also upload a beat using the "Add Beats" tab</h5>
    <br />
    <button onClick={closeModal} className="modal-button">Close</button>
    </Modal>
</>
)
}
