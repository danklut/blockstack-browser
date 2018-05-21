import React from 'react'
import { Type } from '@ui/components/typography'
import { StyledShell } from '@ui/components/shell'
import { ActionButtons } from '@components/ui/containers/button'
import { FormContainer } from '@components/ui/containers/form'
import { withShellContext } from '@blockstack/ui/common/withOnboardingState'
import PropTypes from 'prop-types'

const Shell = ({ children, ...rest }) => {
  return <StyledShell {...rest}>{children}</StyledShell>
}

const Title = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'h1',
  ...rest
}) => {
  const TitleComponent = Type[variant]
  return (
    <StyledShell.Title {...rest}>
      {icon && <StyledShell.Title.Section>{icon}</StyledShell.Title.Section>}
      <StyledShell.Title.Section>
        <StyledShell.Title.Animated>
          <TitleComponent>{children || title}</TitleComponent>
        </StyledShell.Title.Animated>
        {subtitle && <Type.h3 {...subtitle} />}
      </StyledShell.Title.Section>
    </StyledShell.Title>
  )
}

Title.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.oneOf(['h1', 'h2'])
}

Shell.Title = Title

Shell.Main = StyledShell.Main
Shell.Content = StyledShell.Content
Shell.Wrapper = StyledShell.Wrapper
Shell.Actions = StyledShell.Actions
Shell.Loading = StyledShell.Loading
Shell.Sidebar = StyledShell.Sidebar
Shell.Content.Container = StyledShell.Content.Container

const Content = ({ children, form, ...rest }) => (
  <StyledShell.Content {...rest}>
    {form && <FormContainer {...form} />}
    {children}
  </StyledShell.Content>
)

Content.defaultProps = {
  grow: 1
}
Content.propTypes = {
  grow: PropTypes.oneOf([0, 1]).isRequired
}

const ShellScreenContainer = ({
  title,
  titleVariation = 'h1',
  actions,
  content,
  loading,
  setLoadingProps,
  clearLoadingProps,
  ...rest
}) => (
  <React.Fragment>
    {loading && loading.children
      ? setLoadingProps(loading)
      : clearLoadingProps()}
    <Shell.Wrapper {...rest}>
      <Shell.Title {...title} />
      <Content {...content} />
      {actions ? (
        <Shell.Actions>
          <ActionButtons {...actions} />
        </Shell.Actions>
      ) : null}
    </Shell.Wrapper>
  </React.Fragment>
)

ShellScreenContainer.propTypes = {
  actions: PropTypes.object,
  title: PropTypes.object,
  loading: PropTypes.object,
  content: PropTypes.object,
  titleVariant: PropTypes.oneOf(['h1', 'h2'])
}

const ShellScreen = withShellContext(ShellScreenContainer)

export { Shell, ShellScreen }