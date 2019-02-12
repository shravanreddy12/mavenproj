package devops-1.db.setup.table.data;

import java.util.UUID;

import org.jooq.DSLContext;

import devops-1.persistence.tables.records.PersonRecord;

public class PersonTableDataInitializer implements IDataInitializer {

  @Override
  public void initialize(DSLContext context) {
  }

  @Override
  public void addSamples(DSLContext context) {
    context.executeInsert(new PersonRecord(UUID.randomUUID().toString(), "Alice", "Miller", 4000, true));
    context.executeInsert(new PersonRecord(UUID.randomUUID().toString(), "Bob", "Smith", 3000, false));
  }
}
