import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';
import styles from './collapse-container.module.css';

const _DATA = graphql`
  {
    expandIcon: file(relativePath: {eq: "ic_add_black_48dp.png"}) {
      childImageSharp {
        fixed(width: 48) {
          width
          height
          src
          base64
        }
      }
    }
    checkWhiteIcon: file(relativePath: {eq: "ic_check_circle_white_48dp.png"}) {
      childImageSharp {
        fixed(width: 48) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const ICON_STYLE = {
  margin: '0px',
  borderRadius: '50%',
};
class CollapseContainer extends React.Component {
  constructor(props) {
    // The ref might not be necessary, I guess I can just delete it?
    // headerText="header for the collapsible container"
    super(props);
    this.componentRef = React.createRef();
    this.state = {
      isOpen: false,
    };
    this.staticState = {
      isInitialRender: true,
      // Computed Height of header and content elements inside the collapsible
      // container
      collapseHeight: 'auto',
      uncollapseHeight: false,
      // headerComputedHeight: false,
      // contentComputedHeight: false,
    };
  }

  onHeaderClick = event => {
    this.setState({isOpen: !this.state.isOpen});
  };

  componentDidMount() {
    if (this.staticState.isInitialRender) {
      let [headerEl, contentEl] = this.componentRef.current.children;
      this.staticState.collapseHeight = headerEl.scrollHeight;
      this.staticState.uncollapseHeight =
        headerEl.scrollHeight + contentEl.scrollHeight;
      this.staticState.isInitialRender = false;
    }
  }

  render() {
    const elementHeight = this.staticState.isInitialRender
      ? this.staticState.collapseHeight
      : this.state.isOpen
      ? this.staticState.uncollapseHeight
      : this.staticState.collapseHeight;

    return (
      <StaticQuery
        query={_DATA}
        render={data => {
          return (
            <section
              ref={this.componentRef}
              className={styles.collapseContainer}
              style={{height: `${elementHeight}px`}}>
              <header
                onClick={this.onHeaderClick}
                className={styles.collapseHeader}>
                <h3>{this.props.headerText}</h3>
                <Img
                  imgStyle={ICON_STYLE}
                  className={styles.collapseHeaderImgWrapper}
                  fixed={data.expandIcon.childImageSharp.fixed}
                />
              </header>
              <article className={styles.collapseContent}>
                {this.props.children}
              </article>
            </section>
          );
        }}
      />
    );
  }
}

CollapseContainer.defaultProps = {
  headerText: 'default value for the header text',
};

export default CollapseContainer;
