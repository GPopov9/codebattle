import React from 'react';
import _ from 'lodash';
import AccordeonBox from './AccordeonBox';
import color from '../../config/statusColor';

const Output = ({ sideOutput }) => {
  const {
 status, output, result, asserts, version = 0,
} = sideOutput;
  const uniqIndex = _.uniqueId('heading');
  return (
    <>
      {status === 'error' || status === 'memory_leak' ? (
        <AccordeonBox.Item
          output={output}
          result={result}
        />
      ) : (
          asserts && asserts.map((assert, index) => (
            <AccordeonBox.SubMenu
              key={index.toString()}
              statusColor={color[assert.status]}
              assert={version === 2 ? assert : JSON.parse(assert)}
              hasOutput={assert.output}
              uniqIndex={uniqIndex}
            >
              <div className="alert alert-secondary mb-0 pb-0">
                <pre>{assert.output}</pre>
              </div>
            </AccordeonBox.SubMenu>
            ))
        )}
    </>
  );
};

export default Output;
