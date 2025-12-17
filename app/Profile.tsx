import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "../(store)/userStore";
import { User, CursusUser, ProjectUser, Skill, CursusSectionProps } from "../interfaces/interface";

function CursusSection({ cursus, cursusProjects } : CursusSectionProps) {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <View style={{backgroundColor: '#ffffff',padding: 20,borderRadius: 16,marginBottom: 16}}>
      <Text style={{fontSize: 20,fontWeight: 'bold',marginBottom: 8}}>{cursus?.cursus?.slug}</Text>
      <Text style={{fontSize: 16,color: '#adb5bd',marginBottom: 16}}>Level: {cursus?.level}</Text>
      
      <View style={{flexDirection: 'row',backgroundColor: '#1a1a1a',borderRadius: 10,padding: 4,marginBottom: 16}}>
        <TouchableOpacity 
          style={{flex: 1,paddingVertical: 10,paddingHorizontal: 16,borderRadius: 8,alignItems: 'center', backgroundColor: (currentTab ? '#0d6efd' : 'transparent')}} 
          onPress={() => setCurrentTab(1)}
        >
          <Text style={{fontSize: 14, fontWeight: '600',color: (currentTab ? '#ffffff' : '#adb5bd')}}>
            SKILLS ({cursus?.skills?.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{flex: 1,paddingVertical: 10,paddingHorizontal: 16,borderRadius: 8,alignItems: 'center', backgroundColor: (!currentTab ? '#0d6efd' : 'transparent')}} 
          onPress={() => setCurrentTab(0)}
        >
          <Text style={{fontSize: 14, fontWeight: '600',color: (!currentTab ? '#ffffff' : '#adb5bd')}}>
            PROJECTS ({cursusProjects.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{maxHeight: 400}} nestedScrollEnabled>
        {currentTab ? (
          <View>
            {cursus?.skills.map((skill: Skill, skillid:number) => (
              <View key={skillid} style={{backgroundColor: '#343a40',padding: 14,borderRadius: 10,marginBottom: 10}}>
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 6}}>
                  <Text style={{fontSize: 16,fontWeight: '600',color: '#ffffff',flex: 1}}>{skill?.name}</Text>
                  <Text style={{fontSize: 16,color: '#0d6efd',fontWeight: 'bold'}}>
                    {((skill.level / 20) * 100).toFixed(0)}%
                  </Text>
                </View>
                <Text style={{fontSize: 13,color: '#adb5bd',marginBottom: 8}}>Level: {skill?.level}</Text>
                <View style={{height: 6,backgroundColor: '#1a1a1a',borderRadius: 3,overflow: 'hidden'}}>
                  <View 
                    style={{height: '100%',backgroundColor: '#0d6efd',borderRadius: 3, width: `${(skill?.level / 20) * 100}%`}} 
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {cursusProjects?.length > 0 ? (
              cursusProjects.map((project:ProjectUser, projectid:number) => 
                (
                <View key={projectid} style={{backgroundColor: '#343a40',padding: 14,borderRadius: 10,marginBottom: 10}}>
                  <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 8}}>
                    <Text style={{fontSize: 16,fontWeight: '600',color: '#ffffff',flex: 1,marginRight: 10}}>
                      {project?.project?.name}
                    </Text>
                    <View style={{backgroundColor: (project["validated?"] ? '#198754' : (project["validated?"] == null ? '#adb5bd' : '#dc3545')), minWidth:30, borderWidth:0, borderRadius:6, padding: 6}}>
                      <Text style={{color: '#ffffff',fontSize: 12,fontWeight: 'bold', textAlign: 'center'}}>
                        {project?.final_mark !== null ? project?.final_mark : "..."}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{color: '#adb5bd',textAlign: 'center',paddingVertical: 20,fontSize: 14}}>
                No projects found for this cursus
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}



export default function Profile() {
  const userstore: User = useUserStore((state:any) => state.user);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{backgroundColor: '#ffffff',margin: 16,borderRadius: 16}}>
          <View style={{alignItems: 'center', paddingTop: 32}}>
            <Image
              style={{width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: '#ffffff'}}
              source={{uri: userstore?.image?.link || ""}}
            />
          </View>
          <View style={{paddingLeft: 24, paddingRight: 24}}>
            <Text style={{fontSize: 24, fontWeight: 'bold',color: '#1a1a1a',textAlign: 'center',marginBottom: 4}}>{userstore?.displayname}</Text>
            <Text style={{fontSize: 16, color: '#6c757d', textAlign: 'center'}}>Login : {userstore?.login}</Text>
            <View style={{height: 1, backgroundColor: 'black', marginVertical: 20}} />

            <View>
              <View >
                <Text style={styles.infokey}>EMAIL</Text>
                <Text style={styles.infovalue}>{userstore?.email}</Text>
              </View>

               
                <View style={{paddingTop: 20}}>
                  <Text style={styles.infokey}>PHONE</Text>
                  <Text style={styles.infovalue}>{userstore?.phone}</Text>
                </View>

                <View style={{paddingTop: 20}}>
                  <Text style={styles.infokey}>LOCATION</Text>
                  <Text style={styles.infovalue}>{userstore?.location ? userstore?.location : "unavailable"}</Text>
                </View>
              

              <View style={{paddingTop: 20}}>
                <Text style={styles.infokey}>KIND</Text>
                <Text style={styles.infovalue}>{userstore?.kind}   </Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, gap:10, paddingBottom: 10}}>
                <View style={{padding: 10,flex: 1,backgroundColor: '#f8f9fa', justifyContent: "center",borderRadius: 12,alignItems: 'center'}}>
                  <Text style={{fontSize: 24,fontWeight: 'bold',color: '#6c757d'}}>{userstore?.wallet || 0}</Text>
                  <Text style={{fontSize: 12,color: '#1a1a1a',fontWeight: '600',textAlign: 'center'}}>Wallet</Text>
                </View>
                
                <View style={{padding: 10,flex: 1,backgroundColor: '#f8f9fa', justifyContent: "center",borderRadius: 12,alignItems: 'center'}}>
                  <Text style={{fontSize: 24,fontWeight: 'bold',color: '#6c757d'}}>{userstore?.correction_point || 0}</Text>
                  <Text style={{fontSize: 12,color: '#1a1a1a',fontWeight: '600',textAlign: 'center'}}>Evaluation Points</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{paddingRight: 16, paddingLeft: 16}}>
          {userstore?.cursus_users.map((cursus: CursusUser, id:number) => {
            const cursusProjects = userstore?.projects_users.filter((project: ProjectUser) => 
              project?.cursus_ids.includes(cursus?.cursus_id) 
            );
            return (
              <CursusSection 
                key={id}
                cursus={cursus}
                cursusProjects={cursusProjects}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  infokey: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  infovalue: {
    paddingTop: 4,
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  emptyText: {
    color: '#adb5bd',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 14,
  },
});