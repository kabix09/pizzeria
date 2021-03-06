import React, { Component } from 'react';
import { Menu , Input, Label, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../store';
import { setPrice } from '../store/data/price/price.actions';

//selector
function countInitialPrice(basket) 
{
    return basket.length > 0 ?
        basket.reduce(
            (currentValue, currentItem) =>
            {
                return (currentItem.count * currentItem.value.price) + currentValue; 
            }, 0):
        0;
}

const mapStateToProps = (state) => {
    return {
        activeItem: state.label,
        price: countInitialPrice(state.basket)
    }
}

class NavBar extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            link: ['menu', 'basket'],
            activeItem: this.props.activeItem.name
        } 
        
    }

    componentDidUpdate()
    {
        store.dispatch(setPrice(this.props.price));
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    /*
        use SUIR's
        https://stackoverflow.com/questions/42081142/semantic-ui-react-how-to-use-link-components-in-menu-list-elements
    */
    render()
    {
        const activeItem = this.state.activeItem === "home" ? this.props.activeItem.name : this.state.activeItem;   // ?!?!?!
        
        return(
            <nav>
                <Menu pointing secondary style={{width: "90%", margin: "auto", fontSize: "1.4rem"}}>
                    {
                        this.state.link.map(
                            element => <Menu.Item
                                            name={element}
                                            
                                            as={Link}
                                            to = {"/" + element}
                                            
                                            key={Math.random()}

                                            active={activeItem === element}
                                            onClick={this.handleItemClick}
                                        />
                        )
                    }
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input 
                                size='mini'
                                iconPosition='left'
                                labelPosition='right'
                                type='text'
                                readOnly='readonly'
                                placeholder='Price'
                            >
                                <Icon name='shopping basket' color='teal'/>
                                <input style={{width: '100px'}} value={`${this.props.price === undefined ? '00.00' : this.props.price}`}/>
                                <Label>zl</Label>
                            </Input>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </nav>
        );
    }
}

export default connect(mapStateToProps)(NavBar);