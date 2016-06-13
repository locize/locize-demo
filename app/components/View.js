import React from 'react';
import { translate, Interpolate } from 'react-i18next';
import AnotherComponent from './AnotherComponent';


@translate(['app'], { wait: true })
class TranslatableView extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div>
        <h1>{t('appName')}</h1>
        <AnotherComponent />
      </div>
    )
  }
}

export default TranslatableView;
