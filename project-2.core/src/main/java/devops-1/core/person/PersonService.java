package devops-1.core.person;

import static org.eclipse.scout.rt.platform.util.Assertions.assertNotNull;
import static org.eclipse.scout.rt.platform.util.Assertions.assertTrue;
import static org.eclipse.scout.rt.platform.util.StringUtility.hasText;

import java.util.Optional;
import java.util.stream.Stream;

import org.eclipse.scout.rt.platform.BEANS;
import org.eclipse.scout.rt.platform.service.IService;

import devops-1.data.person.IPersonRepository;
import devops-1.data.person.PersonDo;
import devops-1.data.person.PersonRestrictionDo;

public class PersonService implements IService {

  public PersonDo store(String id, PersonDo personDo) {
    //TODO add validation and business logic here
    BEANS.get(IPersonRepository.class).store(id, assertPersonDo(personDo));
    return personDo;
  }

  public Optional<PersonDo> getById(String personId) {
    //TODO add validation and business logic here
    return BEANS.get(IPersonRepository.class).getById(personId);
  }

  public PersonDo create(PersonDo person) {
    //TODO add validation and business logic here
    return BEANS.get(IPersonRepository.class).create(assertPersonDo(person));
  }

  public int remove(String id) {
    //TODO add validation and business logic here
    return BEANS.get(IPersonRepository.class).remove(id);
  }

  public Stream<PersonDo> list(PersonRestrictionDo restrictions) {
    //TODO add validation and business logic here
    return BEANS.get(IPersonRepository.class).list(restrictions);
  }

  protected PersonDo assertPersonDo(PersonDo person) {
    assertTrue(hasText(assertNotNull(person).getLastName()));
    return person;
  }
}
