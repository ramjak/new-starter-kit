import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './HomePage.module.scss';
import makeServices from '../../services';

interface IHomePage {}

interface ISummary {
  alphabets: number;
  reals: number;
  integers: number;
  alphanumerics: number;
}

function HomePage(props: IHomePage) {
  const { getMockRequestService } = useMemo(() => makeServices(), []);
  const request = getMockRequestService();

  const [fileUrl, setFileUlr] = useState('');

  const summaryInitialVal = useMemo(
    () => ({
      alphabets: 0,
      alphanumerics: 0,
      integers: 0,
      reals: 0,
    }),
    []
  );
  const [summary, setSummary] = useState<ISummary>(summaryInitialVal);
  const [doShowSummary, setDoShowSummary] = useState(false);

  const generateFile = useCallback(async () => {
    setFileUlr('');
    setSummary(summaryInitialVal);
    setDoShowSummary(false);
    const res = await request.get('/generate');
    // console.log({ res });
    const { url, summary: summaryData } = res.data;
    setFileUlr(url);
    setSummary(summaryData);
  }, [request, summaryInitialVal]);

  const openReport = useCallback(() => setDoShowSummary(true), []);

  return (
    <main style={{ padding: 20 }}>
      <section className={styles.section}>
        <Button variant="contained" color="primary" onClick={generateFile}>
          Generate
        </Button>
        {fileUrl && (
          <div>
            Link: <a href={fileUrl}>click here</a>
          </div>
        )}
      </section>
      {fileUrl && (
        <section className={styles.section}>
          <Button variant="contained" color="primary" onClick={openReport}>
            Report
          </Button>
          {doShowSummary && (
            <>
              <div>Alphabetical strings: {summary.alphabets}</div>
              <div>Real numbers: {summary.reals}</div>
              <div>Integers: {summary.integers}</div>
              <div>Alphanumerics: {summary.alphanumerics}</div>
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default HomePage;
