import React, { useState, useRef, Fragment } from 'react';
// import { flushSync } from 'react-dom';
import { getFileHash, getChunks } from './utils';

const maxConcurrent = 6;

// 分片上传
function createTask(chunk: any[]) {
  return () => {
    return new Promise(resolve => {
      resolve(chunk);
    })
  }
}

function BigFileUpload() {
  const [pause, setPause] = useState(false);
  const pauseRef = useRef(false);
  const queueRef = useRef<any>([]);
  const [chunks, setChunks] = useState<any[]>([]);
  // const on
  const onSelectFile = function(e: any) {
    console.log('e', e.target.files[0]);
    const file = e.target.files[0];
    const hash: any = getFileHash(file).then(res => {
      console.log('res', res);
      return res;
    });
    const chunks = getChunks(file, hash);
    setChunks(chunks);
    console.log('chunks', hash, chunks);
    // 检验文家是否有上传过
    // const isExist = fetch('checkfile', {
    //   method: 'get',
    //   // body: { hash }
    // });
    if (false) {
      // 上传过
    } else {
      initQueue(chunks);
      // loop(chunks);
    }
  }

  function togglePause(p: any) {
    setPause(p);
    pauseRef.current = p;
    if (!p) {
      loop(chunks);
    }
  }
  // 初始化并发队列
  function initQueue(chunks: any) {
    const q = chunks.splice(0, maxConcurrent);
      q.forEach((v: any) => {
        queueRef.current.push(() => {
          return new Promise((resolve) => {
            resolve(v);
          })
        });
      });
      let bool = false;
      for (let i = 0, len = queueRef.current.length; i < len; i++ ) {
        const task = queueRef.current[i];
        // eslint-disable-next-line no-loop-func
        task().then((v: any) => {
          console.log('v', v);
          const index = queueRef.current.indexOf(task);
          queueRef.current.splice(index, 1);
          if (chunks.length && queueRef.current.length <= maxConcurrent) {
            const chunk = chunks.shift();
            queueRef.current.push(createTask(chunk));
            setChunks(chunks);
            if (!bool) {
              bool = true;
              loop(chunks);
            }
          }
        });
      }
  }

  function loop(chunks: any) {
    const timer = setInterval(() => {
      if (pauseRef.current) {
        clearInterval(timer);
      }
      if (queueRef.current.length < maxConcurrent && chunks.length) {
        const chunk = chunks.shift();
        queueRef.current.push(createTask(chunk));
        setChunks(chunks);
      }
      if (queueRef.current.length) {
        queueRef.current.shift()().then((res: any) => {
          console.log('chunk', res, chunks);
          if (chunks.length && queueRef.current.length <= maxConcurrent) {
            const chunk = chunks.shift();
            queueRef.current.push(createTask(chunk));
            setChunks(chunks);
          }
        });
      } else {
        clearInterval(timer);
        console.log('分片上传完成');
      }
    }, 500);
  }
  return <div>
    <p><button>上传</button></p>
    {!pause && <p><button onClick={() => togglePause(true)}>暂停</button></p>}
    {pause && <Fragment>
      <p><button onClick={() => togglePause(false)}>继续上传</button></p>
      {/* <div>当前暂停位置：{ chunks[chunks.length - 1].index }</div> */}
      </Fragment>}
    <input type="file" onChange={onSelectFile} />
  </div>
}

export default BigFileUpload;
