/**
 * Layout component for all the pages of the site
 */
import React from 'react';
import {Link} from 'gatsby';
import {StaticQuery, graphql} from 'gatsby';
import styles from './layout.module.css';
import './layout.css';
import Img from 'gatsby-image';
import {Helmet} from 'react-helmet';

// String literals
const _VER = 'vertical';
const _HOR = 'horizontal';
const _HEIGHT = '100%';
const _INNER_WIDTH = 580;
const _EVENT_RESIZE = 'resize';
const _LINK_ROOT = '/';
const _LINK_ABOUT = '/about/';
const _LINK_CONTACT = '/contact/';

// graphql data query
const _DATA = graphql`
  {
    navbarBgVer: file(relativePath: {eq: "navbar-ver.jpeg"}) {
      childImageSharp {
        fluid(maxHeight: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    navbarBgHor: file(relativePath: {eq: "navbar-hor.jpeg"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarPosition: this.getPosition(),
    };
  }
  getPosition = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < _INNER_WIDTH ? _HOR : _VER;
    }
  };
  updateSize = () => {
    let position = this.getPosition();
    if (position !== this.state.navbarPosition) {
      // Changin the state will cause a re-render of the page, with this
      // conditional we are only re-rendering when the navbar changes position
      this.setState({navbarPosition: position});
    }
  };

  componentDidMount() {
    window.addEventListener(_EVENT_RESIZE, this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener(_EVENT_RESIZE, this.updateSize);
  }

  render() {
    const navbarPosition = this.state.navbarPosition;
    return (
      <StaticQuery
        query={_DATA}
        render={data => {
          let imgQuery =
            navbarPosition === _VER
              ? data.navbarBgVer.childImageSharp.fluid
              : data.navbarBgHor.childImageSharp.fluid;
          return (
            <div id={styles.layout}>
              <Helmet>
                <title>{this.props.pageTitle}</title>
              </Helmet>
              <nav id={styles.navbar}>
                <div id={styles.navbarBackground}>
                  <Img
                    fadeIn={true}
                    style={{height: _HEIGHT}}
                    fluid={imgQuery}
                  />
                </div>
                <div id={styles.navbarLinkContainer}>
                  <Link className={styles.navLink} to={_LINK_ROOT}>
                    HOME
                  </Link>
                  <Link className={styles.navLink} to={_LINK_ABOUT}>
                    ABOUT
                  </Link>
                  <Link className={styles.navLink} to={_LINK_CONTACT}>
                    CONTACT
                  </Link>
                </div>
              </nav>
              <main id={styles.main}>
                <header id={styles.mainHeader}>
                  <h1>{this.props.headerText}</h1>
                </header>
                <div id={styles.content}>{this.props.children}</div>
                <footer id={styles.footer}>
                  <div id={styles.footerContent}>
                    {new Date().getFullYear()}, Designed by Fidel Sanchez-Bueno
                    and built with{' '}
                    <a href="https://www.gatsbyjs.org"> Gatsby</a>
                  </div>
                </footer>
              </main>
            </div>
          );
        }}
      />
    );
  }
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }
export default Layout;
