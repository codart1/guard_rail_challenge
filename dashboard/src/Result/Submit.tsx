import { Reducer, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Checkbox, Button, Header } from 'semantic-ui-react';
import { match } from 'ts-pattern';

/**
 * Submit a result form.
 * In reality, we should use a form helper like `formik` or `react-hook-form` which handle almost
 * burdensome parts for us. But this is an exercise and we want to simplify it, I decide to leverage
 * the `useReducer` hook to accomplish the goal.
 * Form validation is not covered too, we should handle validation on both client and server though.
 */
export function Submit() {
  const { state, dispatch, submit, loading } = useResultSubmitForm();

  return (
    <Form>
      <Header as="h1">Submit Result</Header>
      <Form.Field>
        <label>Repository name</label>
        <input
          value={state.repositoryName}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              name: 'repositoryName',
              value: e.currentTarget.value,
            })
          }
        />
      </Form.Field>
      <Form.Group inline>
        <label>Status</label>
        {Object.values(Status).map((s) => (
          <Form.Radio
            key={s}
            label={s}
            value="sm"
            checked={state.status === s}
            onChange={() =>
              dispatch({ type: 'SET_FIELD', name: 'status', value: s })
            }
          />
        ))}
      </Form.Group>
      <Form.TextArea
        label="Finding"
        placeholder="Json data of finding..."
        value={state.finding}
        onChange={(e) => {
          dispatch({
            type: 'SET_FIELD',
            name: 'finding',
            value: e.currentTarget.value,
          });
        }}
      />
      <Button onClick={submit} loading={loading}>
        Submit
      </Button>
    </Form>
  );
}

enum Status {
  QUEUED = 'QUEUED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type FormState = {
  repositoryName: string;
  status: Status;
  finding: string;
};

/**
 * Generate reducer's action for setting a field value based on all possible fields
 * defined in `FormState`.
 */
type SetFieldAction = { type: 'SET_FIELD' } & {
  [T in keyof FormState]: {
    name: T;
    value: FormState[T];
  };
}[keyof FormState];

const initial: FormState = {
  repositoryName: '',
  status: Status.QUEUED,
  finding: '',
};

const reducer: Reducer<FormState, SetFieldAction> = (prev, action) => {
  return match(action)
    .with({ type: 'SET_FIELD' }, ({ name, value }) => ({
      ...prev,
      [name]: value,
    }))
    .otherwise(() => prev);
};

const createResultRequest = (input: FormState) => {
  return fetch(`http://localhost:3001/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...input, finding: JSON.parse(input.finding) }),
  }).then((res) => res.json());
};

const useResultSubmitForm = () => {
  const [state, dispatch] = useReducer(reducer, initial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return {
    state,
    dispatch,
    async submit() {
      try {
        setLoading(true);
        await createResultRequest(state);
        navigate('/result/list');
      } catch (e) {
        alert('Oops! something wrong');
        console.warn('Error submitting result...', e);
      } finally {
        setLoading(false);
      }
    },
    loading,
  };
};
