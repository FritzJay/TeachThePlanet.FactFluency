import * as React from 'react'
import { connect } from 'react-redux'
import { setCached } from 'src/lib'
import { handleRehydrateClasses } from 'src/redux/actions/classes';
import { handleRehydrateFactFluency } from 'src/redux/actions/factFluency';
import { handleRehydrateUser } from 'src/redux/actions/user';

interface IProps {
  store: any
  dispatch: any
  children: any
}

interface IState {
  store: any
  loading: boolean
}

class DisconnectedCacheStore extends React.Component<IProps, IState> {
  public state: IState = {
    store: {},
    loading: true,
  }

  private validKeys = ['factFluency', 'classes', 'user']

  private keyMappings = {
    classes: handleRehydrateClasses,
    factFluency: handleRehydrateFactFluency,
    user: handleRehydrateUser,
  }

  private cacheInterval: any

  public async componentDidMount() {
    await this.rehydrateStore(this.props.store)
    this.setState({ loading: false })

    this.cacheInterval = window.setInterval(() => {
      this.cache(this.props.store)
    }, 5000)
  }

  public componentWillUnmount() {
    window.clearInterval(this.cacheInterval)
  }

  public render() {
    if (this.state.loading) {
      return null
    }
    return this.props.children
  }

  private cache = (store: any) => {
    for (const property in store) {
      if (this.validKeys.includes(property)
          && JSON.stringify(store[property]) !== localStorage.getItem(property)) {
        setCached(property, store[property])
      }
    }
  }

  private rehydrateStore = async (store: any) => {
    for (const property in store) {
      if (this.validKeys.includes(property)) {
        const action = this.keyMappings[property]
        this.props.dispatch(action())
      }
    }
  }
}

const mapPropsToState = (store: any) => ({ store })

export const CacheStore = connect(mapPropsToState)(DisconnectedCacheStore)