import React, { useState, useEffect } from 'react';
import { 
  Container,
  Dimmer,
  Grid,
  Header,
  Image,
  Loader,
  Menu,
  Pagination,
  Segment,
} from 'semantic-ui-react'

const SpaceXLoader = () => (
  <Segment style={{marginTop: '10em', padding: '10em 0em'}} inverted>
    <Dimmer active>
      <Loader size='medium'/><br/><br/><br/>
      <Header inverted>Loading...</Header>
    </Dimmer>
    {/* <Image centered fluid src='https://cdn.dribbble.com/users/610788/screenshots/5157282/spacex.png' /> */}
    &nbsp;
  </Segment>
)

const ShipRow = ({ ship }) => {
  const placeholderImage = 'https://cdn.dribbble.com/users/610788/screenshots/5157282/spacex.png'
  const image = ship.image || placeholderImage
  return (
    <Grid.Row>
      <Grid.Column width={8}>
        <Image size='big' src={image} wrapped ui rounded />
      </Grid.Column>
      <Grid.Column>
        <Header>{ship.name}</Header>
        <div>Built in {ship.year_built}</div>
        <div>Ship ID: {ship.id}</div>
        <div>Class: {ship.class}</div>
        <div>Type: {ship.type}</div>
      </Grid.Column>
    </Grid.Row>
  )
}

const ShipsLayout = ({ activePage, ships, changePage }) => (
  <Grid columns='equal' divided padded centered>
    <div>&nbsp;</div>
    {ships.map(ship => (
      <ShipRow key={ship.id} ship={ship} />
    ))}
    <Grid.Row>
      <Pagination
        activePage={activePage}
        boundaryRange={0}
        // defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={3}
        onPageChange={changePage}
      />
      </Grid.Row>
  </Grid>
)

function App() {
  const [loading, setLoading] = useState(true)
  const [ships, setShips] = useState(null)
  const [page, setPage] = useState(0)

  const spacexAPI = 'https://api.spacex.land/graphql/'

  const getShips = async () => {
    setLoading(true)
    const response = await fetch(spacexAPI, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({query: `
        query($limit: Int, $offset: Int) {
          ships(limit: $limit, offset: $offset) {
            active
            class
            name
            image
            id
            year_built
            type
          }
        }`,
        variables: {
          limit: 10,
          offset: page*10
        }
      })
    })
    const data = await response.json()
    return data
  }

  const changePage = (e, { activePage }) => {
    e.preventDefault()
    console.log(activePage)
    setPage(activePage-1)
  }

  useEffect(() => {
    (async () => {
      const data = await getShips()
      setShips(data.data.ships)
      setLoading(false)
    })()
  }, [page])

  return (
      <Container>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              SpaceX Ships
            </Menu.Item>
          </Container>
        </Menu>
        {
          loading ? 
          <SpaceXLoader /> :
          <ShipsLayout activePage={page+1} ships={ships} changePage={changePage} />
        }
      </Container>
  );
}

export default App;
