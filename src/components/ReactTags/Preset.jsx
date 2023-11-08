import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Preset = (props) => {
  const tagRef = useRef(null);
  const { readOnly, preset, classNames, index } = props;

  const label = preset;
  const { className = '' } = preset;
  /* istanbul ignore next */
  const opacity = 1;
  const presetComponent = (
    <div
      className={ClassNames('tag-wrapper', classNames.tagpreset, className)}
      onClick={props.onPresetClicked}
      style={{
        opacity
      }}
    >
      <span
        ref={tagRef}
        className={ClassNames('tag-wrapper', classNames.tagpreset, className)}
      >
        {label}
      </span>
    </div>

  );
  return presetComponent;
};

Preset.propTypes = {
  labelField: PropTypes.string,
  preset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  onPresetClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

Preset.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default Preset;
