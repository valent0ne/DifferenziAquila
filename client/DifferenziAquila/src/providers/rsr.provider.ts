private _createRSRRequest(newRsr: Task) {
  return new Promise((resolve, reject) => {
    this._http.post(URL_BASE + URL.TASKS.CREATE + this._sAccount.getUser().token, {
      text: newTask.text,
      completed: newTask.completed,
      position: newTask.position
    })
      .toPromise()
      .then((res: Response) => {
        const json = res.json() as ResponseServer;

        if (json.result) {
          newTask.id = json.data.id;
          this._tasks.unshift(newTask);
          this._saveOrderTask();
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}
