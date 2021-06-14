import React from 'react'

import { Redirect } from 'react-router-dom';


export function withAuth(InnerComponent) {
    class OuterComponent extends React.Component {
        render() {
            let userInfo = localStorage.getItem("userInfo");

            try {
                userInfo = JSON.parse(userInfo)
            } catch (error) {
                userInfo = null
            }

            if (userInfo) {
                
                return (
                    <InnerComponent {...this.props} />
                )
            }else{
                return (
                    <Redirect to='/login'/>
                )
            }
        }
    }
    return OuterComponent;
}