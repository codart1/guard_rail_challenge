import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import type { Result } from '@entity';
import { FindingData } from '../findingType';
import { Table } from 'semantic-ui-react';

export function Detail() {
  const { id } = useParams();
  const result = useResultDetail(id);

  if (!result) {
    return 'Loading...';
  }

  return (
    <Table compact selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>RuleId</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Severity</Table.HeaderCell>
          <Table.HeaderCell>Path</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {result.finding.findings.map(
          ({ ruleId, location, type, metadata: { severity, description } }) => {
            return (
              <Table.Row key={ruleId}>
                <Table.Cell>{ruleId}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>{severity}</Table.Cell>
                <Table.Cell>
                  {location.path}:{location.positions.begin.line}
                </Table.Cell>
              </Table.Row>
            );
          }
        )}
      </Table.Body>
    </Table>
  );
}

const useResultDetail = (id?: string) => {
  const { data } = useSWR(
    id ? `http://localhost:3001/result/${id}` : null,
    (url) => {
      return fetch(url).then(
        (res) =>
          res.json() as Promise<
            Omit<Result, 'finding'> & { finding: FindingData }
          >
      );
    }
  );
  return data;
};
