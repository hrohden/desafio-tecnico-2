import React, { Component } from 'react'

export class Titulo extends Component {
    render() {
        return (
            <>
                <h1 className="display-4">{this.props.children}</h1>
                {this.props.subtitulo &&
                    <h2><small className="text-muted">{this.props.subtitulo}</small></h2>
                }
                <hr />
            </>
        )
    }
}

export default Titulo
