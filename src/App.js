import React, { useState, useEffect } from 'react';
import { 
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Menu,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react'

const today = new Date()
const year = today.getFullYear()

const SpaceXLoader = () => (
  <Segment data-tid="loader-spacex" style={{marginTop: '10em', padding: '10em 0em'}} inverted>
    <Dimmer active>
      <Loader size='medium'/><br/><br/><br/>
      <Header inverted><span role="img" aria-label="loader--rocket-emoji">🚀</span> Loading...</Header>
    </Dimmer>
    {/* <Image centered fluid src='https://cdn.dribbble.com/users/610788/screenshots/5157282/spacex.png' /> */}
    &nbsp;
  </Segment>
)

const ShipDetail = ({ title, value, testId }) => (
  <>
  { value ?
    <Table.Row>
      <Table.HeaderCell style={{width: '10em'}}>{title}</Table.HeaderCell>
      <Table.Cell data-tid={testId}>{value}</Table.Cell>
    </Table.Row> : null
  }
  </>
)

const ShipRow = ({ ship }) => {
  const placeholderImage = 'https://cdn.dribbble.com/users/610788/screenshots/5157282/spacex.png'
  const image = ship.image || placeholderImage
  const altText = image === placeholderImage ? 
    `Placeholder SpaceX logo image since the SpaceX API did not return an image for the ${ship.name} ship` :
    `Picture of the ${ship.name} SpaceX ship.`
  const testId = ship.id.toLowerCase()
  return (
    <Grid.Row data-tid={`ship-row--${testId}`}>
      <Grid.Column width={8}>
        <Image data-tid={`ship-image--${testId}`} alt={altText} size='big' src={image} wrapped ui rounded />
      </Grid.Column>
      <Grid.Column>
        <Header data-tid={`ship-header--${testId}`}>{ship.name}</Header>
        <Table basic='very' celled>
          <Table.Body>
            <ShipDetail testId={`ship-detail-year--${testId}`} title="Year Built" value={ship.year_built} />
            <ShipDetail testId={`ship-detail-id--${testId}`} title="Ship ID" value={ship.id} />
            <ShipDetail testId={`ship-detail-class--${testId}`} title="Class" value={ship.class} />
            <ShipDetail testId={`ship-detail-type--${testId}`} title="Type" value={ship.type} />
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid.Row>
  )
}

const ShipsLayout = ({ activePage, ships, changePage }) => (
  <Segment style={{marginTop: '3em'}}>

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
        <Grid.Row>
          <Divider />
          <span style={{paddingRight: '0.5em'}} role="img" aria-label="footer--man-with-laptop-emoji">👨‍💻</span> Made by <a style={{paddingLeft: '0.5em'}} href="https://ramosly.com">Joel Ramos</a> <span style={{paddingLeft: '0.5em'}}> © {year}</span>
        </Grid.Row>
        <Grid.Row>
          See the code in <a style={{paddingLeft: '0.5em'}} href="https://gitlab.com/joel.mariano.ramos/spacex-ships">GitLab</a> <Icon style={{paddingLeft: '0.5em'}} name='gitlab' size='large' />
        </Grid.Row>
    </Grid>

  </Segment>
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
        <Menu data-tid="top-menu" fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              SpaceX Ships <span style={{paddingLeft: '0.5em'}} role="img" aria-label="menu--rocket-emoji">🚀</span>
            </Menu.Item>
          </Container>
        </Menu>
        <div>&nbsp;</div>
        {
          loading ? 
          <SpaceXLoader /> :
          <ShipsLayout activePage={page+1} ships={ships} changePage={changePage} />
        }
        <div>&nbsp;</div>
      </Container>
  );
}

export default App;
