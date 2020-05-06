import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card } from 'semantic-ui-react'
import CentralHeader from '../header/CentralHeader'
import AddProduct from '../product/AddProduct'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SellerProduct from '../seller/SellerProduct'
import { getUserOrder, updateStatus } from '../../actions/order';
import { orderStatus } from '../controller/config';

class SellerCentral extends Component {
    constructor(props) {
        super(props);


        this.state = {
            activeNavItem: 'Add Product',
            activeItem: 'Growth',
            orders: [
                {
                    id: '1234',
                    products: [{
                        name: 'Headphones'
                    }, {
                        name: 'Mobile'
                    }]
                },
                {
                    id: '5678',
                    products: [{
                        name: 'Demo'
                    }, {
                        name: 'Mobile'
                    }]
                }
            ]
        }

    }

    componentDidMount = async () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        }
        this.props.getUserOrder();
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleNavItem = (name) => this.setState({ activeNavItem: name })

    render() {
        console.log(this.props.order.userOrders);
        const { activeNavItem, activeItem } = this.state

        var contentPage = (
            <Grid columns={2}>
                <Grid.Column width={5}>
                    <Menu pointing vertical>
                        <Menu.Item
                            name='Top'
                            active={activeItem === 'Top'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Inventory'
                            active={activeItem === 'Inventory'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Pricing'
                            active={activeItem === 'Pricing'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Growth'
                            active={activeItem === 'Growth'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Advertising'
                            active={activeItem === 'Advertising'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Fulfillment'
                            active={activeItem === 'Fulfillment'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={11}>
                    <Container>
                        This is an stretched grid column. This segment will always match the
                    tab height. This will change wrt {this.state.activeItem} tab.
                </Container>
                </Grid.Column>
            </Grid>
        )

        console.log(activeNavItem);

        if (activeNavItem == 'Manage Inventory') {
            contentPage = (<SellerProduct />)
        }
        else if (activeNavItem == 'Add a Product') {
            contentPage = (<AddProduct />)
        }
        else if (activeNavItem == 'REPORT') {
            console.log('Report Page');
        }

        else if (activeNavItem == 'ORDERS') {
            const options = [
                { key: 1, text: 'Ordered', value: 1 },
                { key: 2, text: 'Packing', value: 2 },
                { key: 3, text: 'Out For Delivery', value: 3 },
            ]
            contentPage = this.state.orders.map(order => {

                return (
                    <Card fluid>
                        <Card.Content>
                            <Header as='h3'>ORDER ID: {order.id}</Header>
                        </Card.Content>
                        {order.products.map(product => {
                            return (
                                <Card.Content>
                                    <Grid columns={3}>
                                        <Grid.Column width={3}>
                                            <Placeholder>
                                                <Placeholder.Image style={{ width: '100px', height: '100px' }}></Placeholder.Image>
                                            </Placeholder>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Grid.Row>
                                                {product.name}
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Menu compact>
                                                    <Dropdown text='Order Status' options={options} simple item />
                                                </Menu>
                                            </Grid.Row>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Billing Details</Button>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Payment Details</Button>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Delivery Address</Button>
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid>
                                </Card.Content>
                            )
                        }
                        )}
                    </Card>
                )
            })
        }


        return (
            <Container style={{ marginBottom: '20px' }}>
                <CentralHeader handleNavItem={this.handleNavItem}></CentralHeader>
                <br></br>

                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment textAlign='left'>
                            <Header as='h3'>Your Orders</Header>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>All</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Open</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Delivered</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Cancelled</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>

                            <Header as='h3'>Seller Fulfilled</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>

                            <Header as='h3'>Fulfilled by Amazon</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <br></br>
                            <Container textAlign='center'>
                                <Header as='h4' color='blue' >View your Orders</Header>
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Segment textAlign='left'>
                            {contentPage}
                        </Segment>
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

SellerCentral.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getUserOrder:PropTypes.func.isRequired,
    updateStatus:PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order: state.order
})

export default connect(mapStateToProps, {
    getUserOrder,
    updateStatus
})(withRouter(SellerCentral))
