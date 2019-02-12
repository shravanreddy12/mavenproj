package devops-1.db.setup.table;

import devops-1.db.setup.IDatabaseObject;

public interface IGenerateTable extends IDatabaseObject {

  String getSchemaName();

  String createSQLInternal();

}
