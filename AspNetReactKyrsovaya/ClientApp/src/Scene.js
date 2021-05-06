import * as React from 'react';

//? scene prototype
class Scene extends React.Component {
    static prevScreen = ""
    static prevMountedScreen = "" //? to fix 'go back' in some cases

    constructor(props) {
        super(props)
        this.events = []
        this.onSceneFocus = this.onSceneFocus.bind(this)
        this.onSceneBlur = this.onSceneBlur.bind(this)
    }

    componentDidMount() {
        //? Common
        this.makeEvent('focus', this.onSceneFocus)
        this.makeEvent('blur', this.onSceneBlur)
        // this.makeEvent('beforeRemove', this.onSceneBeforeRemove)

        //? Stack
        // this.makeEvent('transitionStart', this.onSceneTransitionStart)
        // this.makeEvent('transitionEnd', this.onSceneTransitionEnd)

        //? Tab
        // this.makeEvent('tabPress', this.onSceneTabPress)
    }

    componentWillUnmount() {
        if (this.constructor.name === Scene.prevMountedScreen) {
            Scene.prevMountedScreen = ""
        }
        this.events.map((unsubscriber) => {
            unsubscriber()
        })
    }

    makeEvent(name, callback) {
        if (this.constructor.name.substring(0, 3) === 'Tab') {
            return
        }
        this.events.push(this.props.navigation.addListener(name, callback))
    }

    onSceneFocus() { // event: {target, type}
        // console.log('focus=> ', this.constructor.name)
    }

    onSceneBlur() { // event: {target, type}
        Scene.prevScreen = this.constructor.name
        Scene.prevMountedScreen = this.constructor.name
        // console.log('blur=> ', this.constructor.name)
    }
}

export default Scene