export const getListFromRevenues = (list) => {
  const currList = [];
  
  const recursiveListMap = (dep = []) => {
    return dep.map((item) => {
      let { launch, dependencies, ...rest } = item;
      currList.push({ launch, ...rest });
      if (!launch) recursiveListMap(dependencies);
    });
  };

  recursiveListMap(list);
  
  return currList;
}

export const getDependenciesFromRevenue = (list, revenue) => {
  const currList = [];
  
  const recursiveListMap = (dep = []) => {
    return dep.map((item) => {
      let { launch, dependencies } = item;
      if (item.code === revenue.parentId) currList.push(item);
      if (!launch) recursiveListMap(dependencies);
    });
  };

  recursiveListMap(list);
  
  return currList;
}

export const getParentOptionsFromRevenue = (list) => {
  const currList = [];
  
  const recursiveListMap = (dep = []) => {
    return dep.map((item) => {
      let { code, name, launch, dependencies } = item;
      if (!launch) {
        currList.push({ label: `${code} - ${name}`, value: code });
        recursiveListMap(dependencies);
      }
    });
  };

  recursiveListMap(list);
  
  return currList;
}

export const setRevenueOnList = (list, revenue) => {
  const recursiveListMap = (dep = []) => {
    return dep.forEach((item) => {
      let { launch, dependencies } = item;
      if (item.code === revenue.parentId) dependencies.push({ ...revenue });
      if (!launch) recursiveListMap(dependencies);
    });
  };

  recursiveListMap(list);
  
  return list;
}

export const getRevenueByCode = (list, code) => {
  const currList = [];

  const recursiveListMap = (dep = []) => {
    return dep.map((item) => {
      let { launch, dependencies } = item;
      if (item.code === code) currList.push(item);
      if (!launch) recursiveListMap(dependencies);
    });
  };

  recursiveListMap(list);
  
  return currList;
}