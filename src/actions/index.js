export const ActionTypes = {
  SUBMIT_LINKS: 'SUBMIT_LINKS',
};


export function submitLinks(feLink, beLink) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SUBMIT_LINKS,
      payload: { feLink, beLink },
    });

    return Promise.resolve();
  };
}
