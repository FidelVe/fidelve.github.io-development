/**
 * Layout component for all the pages of the site
 */
import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"
import styles from "./layout.module.css"
import "./layout.css"
import Img from "gatsby-image"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navbarPosition: this.getPosition(),
    }
  }
  getPosition = () => {
    return window.innerWidth < 580 ? "horizontal" : " vertical"
  }
  updateSize = () => {
    let position = this.getPosition()
    this.setState({ navbarPosition: position })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize)
  }
  render() {
    let navBarPosition = this.state.navBarPosition
    return (
      <StaticQuery
        query={graphql`
          {
            navbarBgVer: file(relativePath: { eq: "navbar-ver.jpeg" }) {
              childImageSharp {
                fluid(maxHeight: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            navbarBgHor: file(relativePath: { eq: "navbar-hor.jpeg" }) {
              childImageSharp {
                fluid(maxWidth: 2000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <div id={styles.layout}>
            <nav id={styles.navbar}>
              <div id={styles.navbarBackground}>
                {navBarPosition === "vertical" ? (
                  <Img
                    style={{ height: "100%" }}
                    fluid={data.navbarBgVer.childImageSharp.fluid}
                  />
                ) : (
                  <Img
                    style={{ width: "100%" }}
                    fluid={data.navbarBgHor.childImageSharp.fluid}
                  />
                )}
              </div>
              <div id={styles.navbarLinkContainer}>
                <Link className={styles.navLink} to="/">
                  HOME
                </Link>
                <Link className={styles.navLink} to="/about/">
                  ABOUT
                </Link>
                <Link className={styles.navLink} to="/contact/">
                  CONTACT
                </Link>
              </div>
            </nav>
            <main id={styles.main}>
              {/* <DisplaySize /> */}
              <header id={styles.mainHeader}>
                <h1>{this.props.headerText}</h1>
              </header>
              <div id={styles.content}>{this.props.children}</div>
            </main>
          </div>
        )}
      />
    )
  }
}
export default Layout
