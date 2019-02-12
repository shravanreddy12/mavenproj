package devops-1.persistence.person;

import static devops-1.persistence.JooqSqlService.jooq;
import static org.jooq.impl.DSL.noCondition;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import org.eclipse.scout.rt.platform.util.StringUtility;
import org.eclipse.scout.rt.platform.BEANS;
import org.jooq.Field;

import devops-1.data.person.IPersonRepository;
import devops-1.data.person.PersonDo;
import devops-1.data.person.PersonRestrictionDo;
import devops-1.persistence.common.AbstractRepository;
import devops-1.persistence.common.DoEntityBeanMappings;
import devops-1.persistence.tables.Person;
import devops-1.persistence.tables.records.PersonRecord;

public class PersonRepository extends AbstractRepository<Person, PersonRecord, PersonDo> implements IPersonRepository {

  @Override
  public Person getTable() {
    return Person.PERSON;
  }

  @Override
  public Field<String> getIdColumn() {
    return Person.PERSON.PERSON_ID;
  }

  @Override
  public void store(String id, PersonDo person) {
    super.store(id, doToRec(person));
  }

  @Override
  public Stream<PersonDo> all() {
    return getAll().map(this::recToDo);
  }

  @Override
  public Stream<PersonDo> list(PersonRestrictionDo restrictions) {
    Person personTab = Person.PERSON.as("p");
    return jooq()
        .select()
        .from(personTab)
        .where(StringUtility.hasText(restrictions.getFirstName()) ? personTab.FIRST_NAME.likeIgnoreCase('%' + restrictions.getFirstName() + '%') : noCondition(),
            StringUtility.hasText(restrictions.getLastName()) ? personTab.LAST_NAME.likeIgnoreCase('%' + restrictions.getLastName() + '%') : noCondition())
        .limit(100)
        .fetchStream()
        .map(r -> r.into(personTab))
        .map(this::recToDo);
  }

  @Override
  public Optional<PersonDo> getById(String personId) {
    return get(personId).map(this::recToDo);
  }

  @Override
  public PersonDo create(PersonDo person) {
    PersonRecord newPersonRecord = newRecord();
    String newPersonId = UUID.randomUUID().toString();

    fromDoToRecord(person, newPersonRecord)
        .setPersonId(newPersonId);
    newPersonRecord.store();
    return fromRecordToDo(newPersonRecord, person);
  }

  protected PersonDo recToDo(PersonRecord personRecord) {
    return fromRecordToDo(personRecord, BEANS.get(PersonDo.class));
  }

  protected PersonRecord doToRec(PersonDo person) {
    return fromDoToRecord(person, new PersonRecord());
  }

  @Override
  protected DoEntityBeanMappings<PersonDo, PersonRecord> mappings() {
    return new DoEntityBeanMappings<PersonDo, PersonRecord>().with(PersonDo::personId, PersonRecord::getPersonId)
        .with(PersonDo::lastName, PersonRecord::getLastName, PersonRecord::setLastName)
        .with(PersonDo::firstName, PersonRecord::getFirstName, PersonRecord::setFirstName)
        .with(PersonDo::salary, PersonRecord::getSalary, PersonRecord::setSalary)
        .with(PersonDo::external, PersonRecord::getExternal, PersonRecord::setExternal);
  }
}
