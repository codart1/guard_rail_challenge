import { Icon, Label, SemanticCOLORS, Table } from 'semantic-ui-react';
import useSWR from 'swr';
import type { Result } from '@entity';
import { FindingData } from '../findingType';
import { match } from 'ts-pattern';

export function List() {
  const results = useResultList();

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Repository name</Table.HeaderCell>
          <Table.HeaderCell>Scan status</Table.HeaderCell>
          <Table.HeaderCell>Findings</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {results.map(
          ({
            id,
            repositoryName,
            finding,
            status,
            finishedAt,
            queuedAt,
            scanningAt,
          }) => {
            return (
              <Table.Row key={id}>
                <Table.Cell>{repositoryName}</Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      match(status)
                        .with('QUEUED', () => undefined)
                        .with('SUCCESS', () => 'green')
                        .with('FAILURE', () => 'red')
                        .with('IN_PROGRESS', () => 'blue')
                        .exhaustive() as SemanticCOLORS
                    }
                  >
                    {status}
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label>
                    <Icon name="shield" />
                    {finding.findings.length}
                    <Label.Detail>
                      {new Date(
                        match(status)
                          .with('QUEUED', () => queuedAt)
                          .with('IN_PROGRESS', () => scanningAt)
                          .with('FAILURE', () => scanningAt)
                          .with('SUCCESS', () => finishedAt)
                          .exhaustive() as unknown as string
                      ).toLocaleString()}
                    </Label.Detail>
                  </Label>
                </Table.Cell>
              </Table.Row>
            );
          }
        )}
      </Table.Body>
    </Table>
  );
}

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then(
    (res) =>
      res.json() as Promise<
        (Omit<Result, 'finding'> & { finding: FindingData })[]
      >
  );

const useResultList = () => {
  const { data } = useSWR('http://localhost:3001/r', fetcher);
  return data;
};
