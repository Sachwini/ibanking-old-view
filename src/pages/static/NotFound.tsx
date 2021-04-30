import { Container } from "react-bootstrap"

export const FourZeroFour = () => {
    return <Container>
        <h2>Not Found</h2>
        <h5>Page url searching is not found.</h5>

        <button onClick={() => window.location.href='/dashboard'}>Go to dashboard</button>
    </Container>
}